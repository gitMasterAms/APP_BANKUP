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
import { colors } from "../../constants/colors";

type Props = AppStackScreenProps<"CriandoCobranca">;

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
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
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
            placeholderTextColor={colors.gray[420]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            // value={cpf}
            onChangeText={setCpf}
            placeholder="R$0,00"
            placeholderTextColor={colors.gray[420]}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEndereco}
            placeholder="Digite aqui..."
            placeholderTextColor={colors.gray[420]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vencimento</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEndereco}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={colors.gray[420]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Muta</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEndereco}
            placeholder="ex: 2%"
            placeholderTextColor={colors.gray[420]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chave Pix</Text>
          <TextInput
            style={styles.input}
            // value={endereco}
            onChangeText={setEndereco}
            placeholder="Selecione sua chave Pix"
            placeholderTextColor={colors.gray[420]}
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
    backgroundColor: colors.gray[960],
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
    color: colors.gray[50],
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
    color: colors.gray[50],
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: colors.gray[350],
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
    color: colors.gray[420],
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[980],
    borderRadius: 12,
    padding: 16,
    color: colors.gray[50],
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
    backgroundColor: colors.green[500],
    marginLeft: 8,
  },
  buttonSecondary: {
    backgroundColor: colors.gray[980],
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    color: colors.gray[960],
  },
  buttonTextSecondary: {
    color: colors.gray[50],
  },
});
