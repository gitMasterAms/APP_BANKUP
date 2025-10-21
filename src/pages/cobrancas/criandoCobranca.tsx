import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";

type Props = AppStackScreenProps<"CriandoCobranca">;
// --- Cores e Constantes ---
const COLORS = {
  background: "#121212",
  primary: "#ffffff",
  secondary: "#aaaaaa",
  gray: "#8E8E93",
  surface: "#1E1E1E",
  cardBackground: "#303030", // Fundo dos inputs
  inputBorder: "#00cc00", // Borda ou cor de destaque verde
  green: "#00AD4A", // Botão verde SALVAR
  headerText: "#3498db",
};

// --- Componente Principal da Tela ---
export default function CriandoCobranca({ navigation }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState("John Doe");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [endereco, setEndereco] = useState("Rua das Flores, 123");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crie sua Cobrança</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>
          Crie uma nova cobrança para seu cliente!
        </Text>
      </ScrollView>

      {/* --- FORMULÁRIO --- */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Selecionar cliente</Text>
          <TextInput
            style={styles.input}
            // value={nomeCompleto}
            onChangeText={setNomeCompleto}
            placeholder="- Selecione -"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            // value={cpf}
            onChangeText={setCpf}
            placeholder="R$0,00"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            // value={endereco}
            onChangeText={setEndereco}
            placeholder="- Selecione -"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vencimento</Text>
          <TextInput
            style={styles.input}
            // value={endereco}
            onChangeText={setEndereco}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Muta</Text>
          <TextInput
            style={styles.input}
            // value={endereco}
            onChangeText={setEndereco}
            placeholder="-ex: 2%"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chave Pix</Text>
          <TextInput
            style={styles.input}
            // value={endereco}
            onChangeText={setEndereco}
            placeholder="Selecione sua chave Pix"
            placeholderTextColor={COLORS.gray}
          />
        </View>
      </View>

      {/* --- BOTÕES DE AÇÃO --- */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            CANCELAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            SALVAR
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// --- Estilos (CSS) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 35,
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: Platform.OS === "android" ? 55 : 30,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  // Estilos do formulário
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.gray,
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    color: COLORS.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  // Estilos dos botões
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: COLORS.green,
    marginLeft: 8,
  },
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    color: "#000000",
  },
  buttonTextSecondary: {
    color: COLORS.primary,
  },
});
