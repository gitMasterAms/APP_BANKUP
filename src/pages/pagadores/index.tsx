import React, { useState, useCallback } from "react";
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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AppTabScreenProps, PayerData } from "../../routes/types"; // Importar PayerData
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native"; // Importar
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppTabScreenProps<"Pagadores">;

export default function Pagadores({ navigation }: Props) {
  // 1. Estados para dados da API
  const [pagadores, setPagadores] = useState<PayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Lógica para buscar os pagadores (do PagadorTabela.jsx)
  useFocusEffect(
    useCallback(() => {
      const fetchPagadores = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = await AsyncStorage.getItem("token");
          const response = await fetch(`${API_URL}/financial/recurring`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Não foi possível buscar os pagadores.");
          }
          const data = await response.json();
          // Mapeia os dados da API para o tipo PayerData
          setPagadores(data.map((item: any) => ({
            account_id: item.account_id,
            name: item.name,
            description: item.description,
            cpf_cnpj: item.cpf_cnpj,
            email: item.email,
            phone: item.phone,
          })));
        } catch (error: any) {
          console.error("Erro ao buscar pagadores:", error);
          setError(error.message || "Erro ao carregar dados.");
        } finally {
          setLoading(false);
        }
      };

      fetchPagadores();
    }, [])
  );

  const handleSearch = () => {
    console.log("Botão de busca pressionado");
  };

  // 3. Lógica de navegação para Detalhes
  const handlePagadorOptions = (pagador: PayerData) => {
    // Passa o objeto 'pagador' completo para a tela de detalhes
    navigation.navigate("DetalhesPagador", { pagador: pagador });
  };

  // 4. Renderização condicional
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.green[500]} style={{ marginTop: 50 }} />;
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    if (pagadores.length === 0) {
      return <Text style={styles.errorText}>Nenhum pagador cadastrado.</Text>;
    }

    // 5. Mapeia sobre o ESTADO 'pagadores'
    return pagadores.map((pagador) => (
      <View key={pagador.account_id} style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.nome}>{pagador.name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="mail" size={16} color={colors.gray[50]} />
            <Text style={styles.email}>{pagador.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call" size={16} color={colors.gray[50]} />
            <Text style={styles.telefone}>{pagador.phone}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => handlePagadorOptions(pagador)} // Passa o item
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.gray[50]} />
        </TouchableOpacity>
      </View>
    ));
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
        <Text style={styles.headerTitle}>Pagadores</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }} // Aumentado para o FAB
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Botão FAB para 'CadastrarPagador' (Modo de Criação) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CadastrarPagador", {})} // Envia params vazio
      >
        <Ionicons name="add" size={24} color={colors.gray[50]} />
      </TouchableOpacity>
    </View>
  );
}

// Estilos (Adicionado 'errorText')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    position: "relative",
    width: "100%",
    marginBottom: 35,
    height: Platform.OS === "android" ? 100 : 80,
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
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
  searchButton: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "android" ? 50 : 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.gray[970],
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: colors.green[500],
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  nome: {
    color: colors.gray[50],
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  email: {
    color: colors.gray[50],
    fontSize: 14,
    marginLeft: 8,
  },
  telefone: {
    color: colors.gray[50],
    fontSize: 14,
    marginLeft: 8,
  },
  optionsButton: {
    backgroundColor: colors.green[500],
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: colors.green[500],
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.gray[50],
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  errorText: {
    color: colors.gray[300],
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});