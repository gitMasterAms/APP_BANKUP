import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator, // Importado
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styleConfigUser"; // Importa os estilos do arquivo separado
import { AppStackScreenProps, UserData } from "../../routes/types"; // Importar UserData
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native"; // Importado
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importado
import { API_URL } from "../../config/api"; // Importado

type Props = AppStackScreenProps<"ConfigUser">;

export default function ConfigUser({ navigation }: Props) {
  // Estado para armazenar os dados do usuário vindos da API
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useFocusEffect é como o useEffect, mas roda toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert(
            "Erro",
            "Você não está autenticado. Faça login novamente."
          );
          setLoading(false);
          navigation.navigate("Login"); // Manda para o Login
          return;
        }

        try {
          const profileResponse = await fetch(`${API_URL}/user/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setUserData(profileData);
          } else if (profileResponse.status === 404) {
            // 404 significa que o perfil "adicional" não foi preenchido
            // mas o 'email' deve existir (do cadastro inicial)
            const email = await AsyncStorage.getItem("email");
            setUserData({ email: email || "Não informado (404)" });
            Alert.alert(
              "Perfil Incompleto",
              "Por favor, complete seu cadastro na tela de 'Cadastro Adicional'."
            );
            // Você pode querer navegar para 'CadastroAdicional' aqui
          } else {
            const errorData = await profileResponse.json();
            throw new Error(
              errorData.msg || "Falha ao carregar os dados do perfil."
            );
          }
        } catch (error: any) {
          console.error("Erro ao buscar dados do usuário:", error);
          setError(error.message || "Erro ao carregar dados do perfil");
          Alert.alert(
            "Erro",
            error.message || "Erro ao carregar dados do perfil"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [navigation])
  );

  const handleEdit = () => {
    // Navega para a tela de edição passando os dados atuais
    // O erro de tipo não vai mais acontecer pois atualizamos 'routes/types.ts'
    navigation.navigate("EditarDadosUser", { currentUserData: userData });
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
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.green[400]}
              style={{ marginVertical: 50 }}
            />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              {/* --- FOTO DE PERFIL --- */}
              <View style={styles.profilePicContainer}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: "https://placehold.co/100x100/333/FFF?text=Foto",
                  }}
                />
              </View>

              {/* --- FORMULÁRIO (AGORA COM DADOS REAIS) --- */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.input}>
                    {userData.email || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome</Text>
                  <Text style={styles.input}>
                    {userData.name || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CPF</Text>
                  <Text style={styles.input}>
                    {userData.cpf_cnpj || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Endereço</Text>
                  <Text style={styles.input}>
                    {userData.address || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Telefone</Text>
                  <Text style={styles.input}>
                    {userData.phone || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Data de Nascimento</Text>
                  <Text style={styles.input}>
                    {/* Adicionado timeZone: 'UTC' para evitar erro de 1 dia */}
                    {userData.birthdate
                      ? new Date(userData.birthdate).toLocaleDateString(
                          "pt-BR",
                          { timeZone: "UTC" }
                        )
                      : "Não informado"}
                  </Text>
                </View>
              </View>

              {/* --- BOTÕES DE AÇÃO --- */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleEdit} // Chama a função de navegação
                >
                  <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    Editar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
