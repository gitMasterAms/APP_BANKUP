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
  const [formaPagamento, setFormaPagamento] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [jurosMes, setJurosMes] = useState("");
  const [pagador, setPagador] = useState("");
  const [valor, setValor] = useState("");

  const [dropdownAberto, setDropdownAberto] = useState(false);
  const pagadores = ["Thais Simon", "Leoncio", "Macaco Pirado"];
  const [pagadorSelecionado, setPagadorSelecionado] = useState("");

  const handleSalvar = () => {
    console.log("Salvando pagador...");
    // Lógica para salvar o pagador
    navigation.goBack();
  };

  const handleSelecionarPagador = (pagador: string) => {
    setPagadorSelecionado(pagador);
    setDropdownAberto(false);
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

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

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Crie uma nova cobrança para seu cliente!
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Forma de pagamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Pix"
            placeholderTextColor={colors.gray[400]}
            value={formaPagamento}
            onChangeText={setFormaPagamento}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            placeholder="R$: 750,00"
            placeholderTextColor={colors.gray[400]}
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Selecione seu Cliente</Text>
          <View>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownAberto(!dropdownAberto)}
            >
              <Text style={styles.dropdownText}></Text>
            </TouchableOpacity>

            {dropdownAberto && (
              <View style={styles.dropdownMenu}>
                {pagadores.map((pagador, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      pagador === pagadorSelecionado &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleSelecionarPagador(pagador)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        pagador === pagadorSelecionado &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {pagador}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.gray[400]}
              style={styles.dropdownIcon}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Juros ao mês</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. 1%"
            placeholderTextColor={colors.gray[400]}
            value={jurosMes}
            onChangeText={setJurosMes}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Intervalo</Text>
          <TextInput
            style={styles.input}
            placeholder="Mensal"
            placeholderTextColor={colors.gray[400]}
            value={intervalo}
            onChangeText={setIntervalo}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de vencimento</Text>
          <TextInput
            style={styles.input}
            placeholder="00/00/0000"
            placeholderTextColor={colors.gray[400]}
            value={dataVencimento}
            onChangeText={setDataVencimento}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelarButton}
            onPress={handleCancelar}
          >
            <Text style={styles.cancelarButtonText}>CANCELAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.salvarButton} onPress={handleSalvar}>
            <Text style={styles.salvarButtonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 35,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: Platform.OS === "android" ? 55 : 30,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionText: {
    color: colors.gray[300],
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: colors.gray[300],
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: colors.gray[50],
    fontSize: 16,
  },
  inputWithIcon: {
    position: "relative",
  },

  dropdownIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dropdownButton: {
    backgroundColor: colors.gray[970],
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  dropdownText: {
    color: colors.gray[400],
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownMenu: {
    backgroundColor: colors.gray[970],
    borderRadius: 10,
    paddingVertical: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  cancelarButton: {
    flex: 1,
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: "center",
  },
  cancelarButtonText: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: "bold",
  },
  salvarButton: {
    flex: 1,
    backgroundColor: colors.green[500],
    borderRadius: 10,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: "center",
  },
  salvarButtonText: {
    color: colors.gray[900],
    fontSize: 16,
    fontWeight: "bold",
  },
});
