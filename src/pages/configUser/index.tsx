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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styleConfigUser";
import { AppStackScreenProps, UserData } from "../../routes/types";
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"ConfigUser">;

export default function ConfigUser({ navigation }: Props) {
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para a foto
  const [localImage, setLocalImage] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Erro", "Você não está autenticado.");
          setLoading(false);
          navigation.navigate("Login");
          return;
        }

        try {
          // 1. TENTA CARREGAR A FOTO SALVA NO CELULAR (AsyncStorage)
          // Fazemos isso toda vez que a tela ganha foco para pegar atualizações
          const savedImage = await AsyncStorage.getItem("user_profile_image");
          if (savedImage) {
            setLocalImage(savedImage);
          }

          // 2. CARREGA DADOS DA API
          const profileResponse = await fetch(`${API_URL}/user/profile`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setUserData(profileData);

            // Fallback: Se não tiver imagem no celular, mas tiver no banco (futuro), usa a do banco
            if (!savedImage && profileData.avatar_url) {
              setLocalImage(profileData.avatar_url);
            }
          } else if (profileResponse.status === 404) {
            const email = await AsyncStorage.getItem("email");
            setUserData({ email: email || "Não informado" });
          } else {
            const errorData = await profileResponse.json();
            throw new Error(errorData.msg || "Falha ao carregar perfil.");
          }
        } catch (error: any) {
          console.error("Erro geral:", error);
          setError(error.message || "Erro ao carregar dados.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [navigation])
  );

  const handleEdit = () => {
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
                    // Lógica: Usa imagem local > ou do banco > ou placeholder
                    uri: localImage
                      ? localImage
                      : userData.avatar_url ||
                        "https://placehold.co/100x100/333/FFF?text=Foto",
                  }}
                />
              </View>

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
                    {userData.birthdate
                      ? new Date(userData.birthdate).toLocaleDateString(
                          "pt-BR",
                          { timeZone: "UTC" }
                        )
                      : "Não informado"}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleEdit}
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
