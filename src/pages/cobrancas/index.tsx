import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AppTabScreenProps, PayerData, PaymentData } from "../../routes/types"; // Importar tipos
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppTabScreenProps<"Cobrancas">;

export default function Cobrancas({ navigation }: Props) {
  const [cobrancas, setCobrancas] = useState<PaymentData[]>([]);
  const [pagadores, setPagadores] = useState<PayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Lógica para buscar dados (do cobrancaTabela.jsx)
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) throw new Error("Token não encontrado");

          const headers = { Authorization: `Bearer ${token}` };

          // Busca cobranças e pagadores em paralelo
          const [paymentsResponse, pagadoresResponse] = await Promise.all([
            fetch(`${API_URL}/financial/payments`, { headers }),
            fetch(`${API_URL}/financial/recurring`, { headers }),
          ]);

          if (!paymentsResponse.ok || !pagadoresResponse.ok) {
            throw new Error("Falha ao carregar dados do servidor.");
          }

          const paymentsData = await paymentsResponse.json();
          const pagadoresData = await pagadoresResponse.json();

          setCobrancas(paymentsData);
          setPagadores(pagadoresData);
        } catch (error: any) {
          setError(error.message || "Erro de rede");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  );

  // 2. Lógica para mapear ID do pagador para Nome (do cobrancaTabela.jsx)
  const pagadorMap = useMemo(() => {
    return new Map(pagadores.map((p) => [p.account_id, p.name]));
  }, [pagadores]);

  // 3. Lógica para FILTRAR cobranças (do cobrancaTabela.jsx)
  const filteredCobrancas = useMemo(() => {
    if (pagadores.length === 0) return [];
    const pagadorIds = new Set(pagadores.map((p) => p.account_id));
    return cobrancas.filter((c) => pagadorIds.has(c.account_id));
  }, [cobrancas, pagadores]);

  // 4. Lógica de Exclusão (do cobrancaTabela.jsx)
  const handleDelete = (cobranca: PaymentData) => {
    Alert.alert(
      "Excluir Cobrança",
      `Deseja excluir a cobrança "${
        cobranca.description || "sem descrição"
      }" no valor de R$ ${cobranca.amount}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              const response = await fetch(
                `${API_URL}/financial/payments/${cobranca.payment_id}`,
                {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (response.ok) {
                Alert.alert("Sucesso", "Cobrança excluída.");
                // Remove da lista local
                setCobrancas((prev) =>
                  prev.filter((c) => c.payment_id !== cobranca.payment_id)
                );
              } else {
                throw new Error("Erro ao excluir cobrança.");
              }
            } catch (err: any) {
              Alert.alert("Erro", err.message);
            }
          },
        },
      ]
    );
  };

  // 5. Lógica de Edição (do cobrancaTabela.jsx)
  const handleEdit = (cobranca: PaymentData) => {
    navigation.navigate("CriandoCobranca", {
      editId: cobranca.payment_id,
      cobranca: cobranca,
    });
  };

  // 6. Função de formatação
  const formatCurrency = (value: number) => {
    return (value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color={colors.green[500]}
          style={{ marginTop: 50 }}
        />
      );
    }
    if (error) {
      return <Text style={styles.emptyText}>{error}</Text>;
    }
    if (filteredCobrancas.length === 0) {
      return <Text style={styles.emptyText}>Nenhuma cobrança encontrada.</Text>;
    }

    return filteredCobrancas.map((cobranca) => (
      <View key={cobranca.payment_id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cliente}>
            {pagadorMap.get(cobranca.account_id) || "Cliente não encontrado"}
          </Text>
          <Text style={styles.valorCobranca}>
            {formatCurrency(cobranca.amount)}
          </Text>
        </View>
        <Text style={styles.descricao}>
          {cobranca.description || "Sem descrição"}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.vencimento}>
            Vence em: {formatDate(cobranca.due_date)}
          </Text>
          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleEdit(cobranca)}
            >
              <Ionicons name="pencil" size={18} color={colors.gray[50]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(cobranca)}
            >
              <Ionicons name="trash" size={18} color={colors.colorido[10]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cobranças</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("CriandoCobranca", {})} // Modo de Criação
        >
          <FontAwesome5 name="plus" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: colors.gray[960],
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Ajustado
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    width: "100%",
    marginBottom: 20, // Ajustado
    backgroundColor: colors.gray[960],
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    fontWeight: "bold",
  },
  backButton: {
    // Removido 'position: absolute' para alinhar corretamente
  },
  content: {
    flex: 1,
    gap: 10,
  },
  emptyText: {
    color: colors.gray[300],
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.gray[970],
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: colors.green[500],
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cliente: {
    color: colors.gray[50],
    fontSize: 19,
    fontWeight: "600",
  },
  valorCobranca: {
    color: colors.gray[50],
    fontSize: 18,
    fontWeight: "bold",
  },
  descricao: {
    color: colors.gray[300],
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  vencimento: {
    color: colors.gray[200],
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  // Status removidos pois a API não parece tê-los
});
