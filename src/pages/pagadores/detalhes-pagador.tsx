import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert, // Importar
  ActivityIndicator, // Importar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps, PayerData } from "../../routes/types"; // Importar PayerData
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"DetalhesPagador">;

// Tipo para os pagamentos (cobranças)
type Payment = {
  payment_id: string;
  amount: number;
  description: string;
  due_date: string;
};

export default function DetalhesPagador({ navigation, route }: Props) {
  // 1. Recebe o pagador da rota
  const { pagador } = route.params;

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // 2. Busca o histórico de pagamentos (cobranças) deste pagador
  useEffect(() => {
    const fetchPayments = async () => {
      setLoadingPayments(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/financial/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allPayments = await response.json();
        
        // Filtra os pagamentos SÓ deste pagador (como na web)
        const payerPayments = allPayments.filter(
          (p: any) => p.account_id === pagador.account_id
        );
        setPayments(payerPayments);
      } catch (e) {
        console.error("Erro ao buscar pagamentos", e);
      } finally {
        setLoadingPayments(false);
      }
    };
    fetchPayments();
  }, [pagador.account_id]);


  // 3. Lógica para EDITAR (navega para a tela de cadastro)
  const handleEditar = () => {
    navigation.navigate("CadastrarPagador", { editId: pagador.account_id });
  };

  // 4. Lógica para EXCLUIR (do PagadorTabela.jsx)
  const handleExcluir = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir "${pagador.name}"? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoadingDelete(true);
            try {
              const token = await AsyncStorage.getItem("token");
              const response = await fetch(
                `${API_URL}/financial/recurring/${pagador.account_id}`,
                {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (response.ok) {
                Alert.alert("Sucesso", "Pagador excluído com sucesso.");
                navigation.goBack(); // Volta para a lista
              } else {
                throw new Error("Erro ao excluir pagador.");
              }
            } catch (error: any) {
              Alert.alert("Erro", error.message || "Não foi possível excluir.");
            } finally {
              setLoadingDelete(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Pagador</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.nomePagador}>{pagador.name}</Text>

        {/* 5. Exibe os dados reais do pagador */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{pagador.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefone</Text>
            <Text style={styles.value}>{pagador.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>CPF/CNPJ</Text>
            <Text style={styles.value}>{pagador.cpf_cnpj}</Text>
          </View>
        </View>

        {/* 6. Botões de Ação (Editar e Excluir) */}
        <View style={styles.actionButtonContainer}>
           <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={handleEditar}
            disabled={loadingDelete}
          >
            <Ionicons name="pencil" size={16} color={colors.gray[900]} />
            <Text style={styles.buttonTextPrimary}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton, loadingDelete && styles.buttonDisabled]} 
            onPress={handleExcluir}
            disabled={loadingDelete}
          >
            {loadingDelete ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="trash" size={16} color={colors.gray[50]} />
                <Text style={styles.buttonTextSecondary}>EXCLUIR</Text>
              </>
            )}
          </TouchableOpacity>
        </View>


        {/* 7. Histórico de Cobranças */}
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>
              Histórico de Cobranças
            </Text>
          </View>

          {loadingPayments ? (
            <ActivityIndicator color={colors.green[500]} style={{ margin: 15 }} />
          ) : (
            <View style={styles.dropdownMenu}>
              {payments.length === 0 ? (
                <Text style={styles.noPaymentsText}>Nenhuma cobrança encontrada.</Text>
              ) : (
                payments.map((pagamento) => (
                  <View key={pagamento.payment_id} style={styles.dropdownItem}>
                     <View>
                      <Text style={styles.dropdownItemText}>{pagamento.description || "Cobrança"}</Text>
                      <Text style={styles.dropdownItemDate}>
                        Venc: {new Date(pagamento.due_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                      </Text>
                     </View>
                     <Text style={styles.dropdownItemValue}>
                       R$ {pagamento.amount.toFixed(2)}
                     </Text>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Ajustado
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    position: "relative",
    width: "100%",
    marginBottom: 35,
    height: Platform.OS === "android" ? 100 : 80,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "android" ? 50 : 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 20, // Ajustado
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nomePagador: {
    color: colors.gray[50],
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  infoContainer: {
    backgroundColor: colors.gray[970],
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10, // Ajustado
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10, // Ajustado
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[900],
  },
  label: {
    color: colors.green[500],
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: "500",
    flex: 1, // Permite quebra de linha
    textAlign: 'right',
    marginLeft: 10,
  },
  // Botões de Ação
  actionButtonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    minHeight: 48,
  },
  editButton: {
    backgroundColor: colors.green[500],
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d', // Vermelho
    marginLeft: 10,
  },
  buttonTextPrimary: {
    color: colors.gray[900],
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buttonTextSecondary: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },

  // Dropdown / Histórico
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: colors.gray[970],
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dropdownText: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownMenu: {
    backgroundColor: colors.gray[970],
    borderRadius: 10,
    paddingVertical: 10,
  },
  noPaymentsText: {
    color: colors.gray[400],
    textAlign: 'center',
    padding: 15,
    fontStyle: 'italic',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[900],
  },
  dropdownItemText: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownItemDate: {
    color: colors.gray[400],
    fontSize: 12,
  },
  dropdownItemValue: {
     color: colors.gray[50],
     fontSize: 16,
     fontWeight: 'bold',
  }
});