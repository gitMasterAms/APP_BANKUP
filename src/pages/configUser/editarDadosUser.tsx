import React, { useState, useEffect } from "react"; // Adicionei useEffect
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
import * as ImagePicker from "expo-image-picker";

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

  // Estado da imagem local
  const [localImage, setLocalImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. CARREGAR A FOTO SALVA NO CELULAR AO ABRIR A TELA ---
  useEffect(() => {
    const loadSavedImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("user_profile_image");
        if (savedImage) {
          setLocalImage(savedImage);
        } else if (currentUserData.avatar_url) {
          // Se não tiver no celular, mas tiver no banco, usa do banco
          setLocalImage(currentUserData.avatar_url);
        }
      } catch (e) {
        console.log("Erro ao carregar imagem salva", e);
      }
    };
    loadSavedImage();
  }, []);

  // --- 2. FUNÇÃO PARA ESCOLHER FOTO NA GALERIA ---
  const pickImage = async () => {
    // Pede permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
      return;
    }

    // Abre galeria
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Corta quadrado
      quality: 1,
    });

    if (!result.canceled) {
      // Atualiza o estado visualmente na hora
      setLocalImage(result.assets[0].uri);
    }
  };

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
      Alert.alert(
        "Atenção",
        "Preencha os campos obrigatórios (nome, CPF e email)."
      );
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
        // --- PASSO B: SALVA A FOTO NO CELULAR (ASYNC STORAGE) ---
        // Isso acontece apenas se a API der sucesso primeiro
        if (localImage) {
          await AsyncStorage.setItem("user_profile_image", localImage);
        }

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
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.profilePic}
                source={{
                  // Prioridade: Imagem local > Imagem do banco > Placeholder
                  uri: localImage
                    ? localImage
                    : currentUserData.avatar_url ||
                      "https://placehold.co/100x100/333/FFF?text=Foto",
                }}
              />
              {/* Ícone de câmera para indicar clique */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: colors.green[400],
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Ionicons name="camera" size={16} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage}>
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
