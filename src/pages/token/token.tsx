import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, // Importar Alert
  ActivityIndicator, // Importar ActivityIndicator
} from "react-native";
import { colors } from "../../constants/colors";
import { AppStackScreenProps } from "../../routes/types";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage
import { API_URL } from "../../config/api"; // Importar API_URL

type Props = AppStackScreenProps<"Token">;

export default function TokenScreen({ navigation }: Props) {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para armazenar os dados do AsyncStorage
  const [userId, setUserId] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // 1. Carrega os dados necessários (userId, type, email) do AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedType = await AsyncStorage.getItem("type");
      const storedEmail = await AsyncStorage.getItem("email"); // Necessário para "Reenviar"

      if (!storedUserId || !storedType) {
        Alert.alert(
          "Erro",
          "Sessão inválida. Por favor, tente o processo novamente."
        );
        navigation.navigate("Login"); // Volta ao início se não tiver os dados
        return;
      }

      setUserId(storedUserId);
      setType(storedType);
      setEmail(storedEmail);
    };
    loadData();
  }, [navigation]);

  // 2. Lógica de Verificação (handleVerify)
  const handleVerify = async () => {
    if (!code || code.length < 6 || !userId || !type) {
      setError("Por favor, digite um código válido de 6 dígitos.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Endpoint de verificação (lógica do backend da web)
      const response = await fetch(`${API_URL}/user/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          twoFactorCode: code, // Usa twoFactorCode como na web
          type: type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Código inválido ou expirado.");
      }

      // SUCESSO! Agora, decide o que fazer baseado no 'type'
      if (type === "login_verification") {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("profile_complete", String(data.profile_complete || false));
        
        // Salva dados do usuário se disponíveis
        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }

        // Limpa os dados temporários
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("type");
        await AsyncStorage.removeItem("email");

        Alert.alert("Sucesso!", "Código verificado com sucesso!");

        // Navega baseado no profile_complete (igual à web)
        if (data.profile_complete) {
          navigation.navigate("AppDrawer"); // Navega para Home via Drawer
        } else {
          navigation.navigate("CadastroAdicional"); // Navega para completar cadastro
        }
      } else if (type === "password_reset") {
        if (data.resetToken) {
          await AsyncStorage.setItem("resetToken", data.resetToken);
        }
        await AsyncStorage.removeItem("type");
        await AsyncStorage.removeItem("email");

        Alert.alert("Sucesso!", "Código verificado. Defina sua nova senha.");
        navigation.navigate("RedefinirSenha"); // Navega para RedefinirSenha
      }
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Lógica para Reenviar o Código
  const handleResend = async () => {
    if (!userId || !email || !type) {
      Alert.alert("Erro", "Dados da sessão não encontrados para o reenvio.");
      return;
    }

    setIsResending(true);
    setError(null);

    try {
      // Endpoint de envio de código (o mesmo do Login/EsquecerSenha)
      const response = await fetch(`${API_URL}/user/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          email: email,
          type: type,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || "Não foi possível reenviar o código.");
      }

      Alert.alert("Enviado!", "Um novo código foi enviado para o seu e-mail.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verificação de Segurança</Text>
        <Text style={styles.subtitle}>
          Enviamos um código para seu e-mail ({email || "..."}). Digite-o
          abaixo.
        </Text>

        <Text style={styles.label}>Código de Verificação</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o código recebido"
          placeholderTextColor={colors.gray[300]}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          editable={!isLoading && !isResending}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.verifyButton,
            (isLoading || isResending) && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={isLoading || isResending}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.gray[900]} />
          ) : (
            <Text style={styles.verifyButtonText}>Verificar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResend}
          disabled={isLoading || isResending}
        >
          <Text style={styles.resendText}>
            {isResending ? "Reenviando..." : "Reenviar código"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Adicione os estilos 'error' e 'verifyButtonDisabled'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.gray[100],
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[100],
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10, // Para o email não quebrar feio
  },
  label: {
    color: colors.gray[400],
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    backgroundColor: colors.gray[450],
    color: colors.gray[100],
    borderRadius: 30,
    padding: 15,
    marginBottom: 20,
  },
  verifyButton: {
    width: 290,
    backgroundColor: colors.green[400],
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  verifyButtonDisabled: {
    backgroundColor: colors.green[700],
    opacity: 0.8,
  },
  verifyButtonText: {
    color: colors.gray[900],
    fontWeight: "bold",
    fontSize: 16,
  },
  resendText: {
    color: colors.gray[100],
    textDecorationLine: "underline",
    marginTop: 5,
  },
  error: {
    color: "#ff5252",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
