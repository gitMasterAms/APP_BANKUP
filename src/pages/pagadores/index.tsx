import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AppTabScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppTabScreenProps<"Pagadores">;

export default function Pagadores({ navigation }: Props) {
  // Dados de exemplo dos pagadores
  const pagadores = [
    {
      id: 1,
      nome: "Ronaldo",
      email: "ronaldo@gmail.com",
      telefone: "(85) 99999-9999",
    },
    {
      id: 2,
      nome: "Ana Caroline",
      email: "anacaroline@gmail.com",
      telefone: "(85) 98888-8888",
    },
    {
      id: 3,
      nome: "Gildárcio",
      email: "gildarcio@gmail.com",
      telefone: "(85) 97777-7777",
    },
  ];

  const handleSearch = () => {
    console.log('Botão de busca pressionado');
    // Lógica para abrir busca
  };

  const handlePagadorOptions = (pagadorId: number) => {
    console.log('Opções do pagador:', pagadorId);
    navigation.navigate("DetalhesPagador");
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
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {pagadores.map((pagador) => (
          <View key={pagador.id} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.nome}>{pagador.nome}</Text>
              
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={16} color={colors.gray[50]} />
                <Text style={styles.email}>{pagador.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} color={colors.gray[50]} />
                <Text style={styles.telefone}>{pagador.telefone}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handlePagadorOptions(pagador.id)}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color={colors.gray[50]} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CadastrarPagador")}
      >
        <Ionicons name="add" size={24} color={colors.gray[50]} />
      </TouchableOpacity>
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
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 35,
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    top: Platform.OS === "android" ? 55 : -5,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "android" ? 55 : 30,
  },
  searchButton: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "android" ? 55 : 30,
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
});