import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styleConfigUser";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"EditarDadosUser">;

export default function EditarDadosUser({ navigation, route }: Props) {
  const { currentUserData } = route.params;

  // Converte data ISO → DD/MM/AAAA
  const formatarDeISO = (isoDate?: string) => {
    if (!isoDate || !isoDate.includes("-")) return "";
    const [ano, mes, dia] = isoDate.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Converte DD/MM/AAAA → ISO
  const formatarParaISO = (data: string) => {
    if (!data || data.length < 10) return "";
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  // Estado inicial com todos os campos
  const [nomeCompleto, setNomeCompleto] = useState(currentUserData.name || "");
  const [cpf, setCpf] = useState(currentUserData.cpf_cnpj || "");
  const [endereco, setEndereco] = useState(currentUserData.address || "");
  const [telefone, setTelefone] = useState(currentUserData.phone || "");
  const [email, setEmail] = useState(currentUserData.email || "");
  const [nascimento, setNascimento] = useState(
    formatarDeISO(currentUserData.birthdate)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSalvar = async () => {
    setLoading(true);
    setError(null);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erro", "Autenticação inválida.");
      setLoading(false);
      return;
    }

    // Validações básicas
    if (!nomeCompleto || !cpf || !email) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios (nome, CPF e email).");
      setLoading(false);
      return;
    }

    const updatedData = {
      name: nomeCompleto,
      cpf_cnpj: cpf,
      address: endereco,
      phone: telefone,
      email: email,
      birthdate: formatarParaISO(nascimento),
    };

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.goBack(); // volta para tela ConfigUser
      } else {
        throw new Error(responseData.msg || "Erro ao salvar o perfil.");
      }
    } catch (err: any) {
      setError(err.message || "Erro de conexão.");
      Alert.alert("Erro", err.message || "Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* FOTO DE PERFIL */}
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{ uri: "https://placehold.co/100x100/333/FFF?text=Foto" }}
            />
            <TouchableOpacity>
              <Text style={styles.changePicText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.inputEditar}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder="Digite seu nome completo"
                placeholderTextColor={colors.gray[400]}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CPF *</Text>
              <TextInput
                style={styles.inputEditar}
                value={cpf}
                onChangeText={setCpf}
                placeholder="000.000.000-00"
                placeholderTextColor={colors.gray[400]}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.inputEditar}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Seu endereço completo"
                placeholderTextColor={colors.gray[400]}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.inputEditar}
                value={telefone}
                onChangeText={setTelefone}
                placeholder="(00) 00000-0000"
                placeholderTextColor={colors.gray[400]}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.inputEditar}
                value={email}
                onChangeText={setEmail}
                placeholder="seuemail@email.com"
                placeholderTextColor={colors.gray[400]}
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                style={styles.inputEditar}
                value={nascimento}
                onChangeText={setNascimento}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.gray[400]}
                maxLength={10}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>
          </View>

          {/* Exibe erro */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* BOTÕES */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                CANCELAR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonPrimary,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleSalvar}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.gray[900]} />
              ) : (
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                  SALVAR
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}