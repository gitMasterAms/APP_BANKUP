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
  ActivityIndicator, // Importado
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styleConfigUser"; // Importa os estilos do arquivo separado
import { AppStackScreenProps } from "../../routes/types"; // Importado
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importado
import { API_URL } from "../../config/api"; // Importado

type Props = AppStackScreenProps<"EditarDadosUser">;

// Esta tela agora recebe os dados da tela anterior
export default function EditarDadosUser({ navigation, route }: Props) {
  // 1. Recebe os dados atuais da rota
  const { currentUserData } = route.params;

  // 2. Inicia o estado com os dados recebidos
  const [originalData] = useState(currentUserData); // Guarda os dados originais
  const [nomeCompleto, setNomeCompleto] = useState(currentUserData.name || "");
  const [cpf, setCpf] = useState(currentUserData.cpf_cnpj || "");
  const [endereco, setEndereco] = useState(currentUserData.address || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3. Lógica para Salvar (PUT /user/profile)
  const handleSalvar = async () => {
    setLoading(true);
    setError(null);
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Erro", "Autenticação inválida.");
      setLoading(false);
      return;
    }

    // Monta o payload
    // IMPORTANTE: Mantém os dados originais (email, phone, etc.)
    // e atualiza apenas os campos desta tela.
    const updatedData = {
      ...originalData,
      name: nomeCompleto,
      cpf_cnpj: cpf,
      address: endereco,
      // Os campos 'email', 'phone' e 'birthdate' de 'originalData' são preservados
    };

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT", // Usa PUT para atualizar (como no CadastroAdicional)
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.goBack(); // Volta para a tela ConfigUser (que vai recarregar)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erro ao salvar o perfil.");
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
          {/* --- FOTO DE PERFIL --- */}
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{ uri: "https://placehold.co/100x100/333/FFF?text=Foto" }}
            />
            <TouchableOpacity>
              <Text style={styles.changePicText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          {/* --- FORMULÁRIO --- */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
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
              <Text style={styles.label}>CPF</Text>
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
          </View>

          {/* Exibe o erro, se houver */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* --- BOTÕES DE AÇÃO --- */}
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
                loading && styles.buttonDisabled, // Estilo de desabilitado
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
