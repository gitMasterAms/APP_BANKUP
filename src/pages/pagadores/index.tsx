import React, { useState, useCallback } from "react";
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
import { AppTabScreenProps, PayerData } from "../../routes/types";
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppTabScreenProps<"Pagadores">;

export default function Pagadores({ navigation }: Props) {
  // 1. Estados para dados da API
  const [pagadores, setPagadores] = useState<PayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Lógica para buscar os pagadores
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
          
          setPagadores(
            data.map((item: any) => ({
              account_id: item.account_id,
              name: item.name,
              description: item.description,
              cpf_cnpj: item.cpf_cnpj,
              email: item.email,
              phone: item.phone,
            }))
          );
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

  // 3. Lógica de navegação para Detalhes
  const handlePagadorOptions = (pagador: PayerData) => {
    navigation.navigate("DetalhesPagador", {
      pagadorId: pagador.account_id,
    });
  };

  // 4. Renderização condicional
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
      return <Text style={styles.errorText}>{error}</Text>;
    }
    if (pagadores.length === 0) {
      return <Text style={styles.errorText}>Nenhum pagador cadastrado.</Text>;
    }

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
          onPress={() => handlePagadorOptions(pagador)}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={colors.gray[50]}
          />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.containerWrapper}>
      {/* HEADER IGUAL AO DE COBRANÇAS */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Pagadores</Text>

        {/* Botão de Adicionar no Header (Substituindo a Busca) */}
        <TouchableOpacity 
           onPress={() => navigation.navigate("CadastrarPagador", {})}
        >
           <FontAwesome5 name="plus" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
           {renderContent()}
        </View>
      </ScrollView>

      {/* FAB REMOVIDO */}
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
  // Estilo Header padronizado com a tela de Cobranças
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Espaça os itens (botão esq - titulo - botão dir)
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.gray[960],
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    fontWeight: "bold",
  },
  backButton: {
    // Posicionamento absoluto removido para fluir com o layout space-between
  },
  content: {
    flex: 1,
    gap: 10,
  },
  // Estilos dos Cards
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
  errorText: {
    color: colors.gray[300],
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});