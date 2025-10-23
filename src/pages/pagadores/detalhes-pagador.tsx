import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppStackScreenProps<"DetalhesPagador">;

export default function DetalhesPagador({ navigation }: Props) {
  const [mesSelecionado, setMesSelecionado] = useState("Novembro");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const meses = ["Novembro", "Outubro", "Setembro", "Agosto", "Julho"];

  const handleVoltar = () => {
    navigation.goBack();
  };

  const handleComprovante = () => {
    console.log('Visualizar comprovante');
    // Lógica para visualizar comprovante
  };

  const handleSelecionarMes = (mes: string) => {
    setMesSelecionado(mes);
    setDropdownAberto(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleVoltar}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagadores</Text>
        <TouchableOpacity 
          style={styles.searchButton}
        >
          <Ionicons name="search" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.nomePagador}>André Silveira</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Código</Text>
            <Text style={styles.value}>123456790</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Data e hora</Text>
            <Text style={styles.value}>11/11/25 às 19h30</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Valor</Text>
            <Text style={styles.value}>R$300,00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.comprovanteButton} onPress={handleComprovante}>
          <Text style={styles.comprovanteText}>Comprovante</Text>
        </TouchableOpacity>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownAberto(!dropdownAberto)}
          >
            <Text style={styles.dropdownText}>
              Outras transferencias
            </Text>
          </TouchableOpacity>

          {dropdownAberto && (
            <View style={styles.dropdownMenu}>
              {meses.map((mes, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    mes === mesSelecionado && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelecionarMes(mes)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    mes === mesSelecionado && styles.dropdownItemTextSelected
                  ]}>
                    {mes}
                  </Text>
                </TouchableOpacity>
              ))}
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
    paddingHorizontal: 45,
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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nomePagador: {
    color: colors.gray[50],
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  infoContainer: {
    backgroundColor: colors.gray[970],
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
  },
  comprovanteButton: {
    backgroundColor: colors.green[500],
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  comprovanteText: {
    color: colors.gray[900],
    fontSize: 16,
    fontWeight: "bold",
  },
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
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dropdownItemSelected: {
    backgroundColor: colors.green[500],
  },
  dropdownItemText: {
    color: colors.gray[50],
    fontSize: 16,
  },
  dropdownItemTextSelected: {
    color: colors.gray[900],
    fontWeight: "bold",
  },
});
