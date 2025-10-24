import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppStackScreenProps<"CadastrarPagador">;

export default function CadastrarPagador({ navigation }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSalvar = () => {
    console.log('Salvando pagador...');
    // Lógica para salvar o pagador
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Dados do Cliente</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Crie um novo cliente para suas cobranças!
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor={colors.gray[400]}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF/CNPJ</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            placeholderTextColor={colors.gray[400]}
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor={colors.gray[400]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            placeholderTextColor={colors.gray[400]}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Aluguel"
              placeholderTextColor={colors.gray[400]}
              value={categoria}
              onChangeText={setCategoria}
            />
            <Ionicons 
              name="chevron-down" 
              size={20} 
              color={colors.gray[400]} 
              style={styles.dropdownIcon}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="00000-000"
            placeholderTextColor={colors.gray[400]}
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade, Bairro, Número"
            placeholderTextColor={colors.gray[400]}
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelarButton}
            onPress={handleCancelar}
          >
            <Text style={styles.cancelarButtonText}>CANCELAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.salvarButton}
            onPress={handleSalvar}
          >
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
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
