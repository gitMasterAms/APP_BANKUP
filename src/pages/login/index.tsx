import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styleLogin } from "./styleLogin";
import { colors } from "../../constants/colors";
import { AppStackScreenProps } from "../../routes/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // 1. Verifica token já salvo (igual ao desktop)
  useEffect(() => {
    const verificarToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(`${API_URL}/user/check`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (data.valid === true) {
            // Token válido, vai para a home do app (Home)
            navigation.navigate("Home");
          }
          // Se for inválido, não faz nada, fica no Login
        } catch (err) {
          console.log("Erro ao verificar o token:", err);
          // Em caso de erro de rede, fica no Login
        }
      }
    };
    verificarToken();
  }, [navigation]);

  // 2. Função de Login atualizada (lógica do desktop)
  async function getLogin() {
    setLoading(true);
    setErro(null);

    // Validação local
    if (!email || !senha) {
      setErro("Informe os campos obrigatórios!");
      setLoading(false);
      return;
    }

    try {
      // Etapa 1: Fazer o Login
      const loginRes = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: senha }),
      });

      if (!loginRes.ok) {
        const erro = await loginRes.json();
        setErro(erro.msg || "Login inválido. Verifique e-mail e senha.");
        setLoading(false);
        return;
      }

      const loginData = await loginRes.json();
      const userId = loginData.id;

      // Salva email e userId no AsyncStorage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("userId", String(userId));
      const type = "login_verification";

      // Etapa 2: Enviar o código de verificação
      const sendCodeRes = await fetch(`${API_URL}/user/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          type,
        }),
      });

      if (sendCodeRes.ok) {
        Alert.alert(
          "Sucesso",
          "Código de verificação enviado para o seu e-mail."
        );
        await AsyncStorage.setItem("type", type);
        navigation.navigate("Token");
      } else {
        const erro = await sendCodeRes.json();
        setErro(erro.msg || "Erro ao enviar o código de verificação.");
      }
    } catch (err) {
      console.error("Erro geral no login:", err);
      setErro("Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styleLogin.container}>
      <Text style={styleLogin.title}>Bem-vindo de volta!</Text>

      <Text style={styleLogin.label}>E-mail</Text>
      <TextInput
        style={styleLogin.input}
        placeholder="digite seu e-mail"
        value={email} // Descomentado
        onChangeText={setEmail} // Descomentado
        placeholderTextColor={colors.gray[400]}
        keyboardType="email-address" // Adicionado
        autoCapitalize="none" // Adicionado
        editable={!loading} // Adicionado
      />

      <Text style={styleLogin.label}>Senha</Text>
      <TextInput
        style={styleLogin.input}
        placeholder="********"
        secureTextEntry // Descomentado
        value={senha} // Descomentado (era 'password' no seu exemplo)
        onChangeText={setSenha} // Descomentado (era 'setPassword')
        placeholderTextColor={colors.gray[400]}
        editable={!loading} // Adicionado
      />

      {/* Exibe o erro do servidor ou de validação */}
      {erro ? <Text style={styleLogin.error}>{erro}</Text> : null}

      <TouchableOpacity
        onPress={() => (!loading ? navigation.navigate("EsqueceuSenha") : null)}
      >
        <Text style={styleLogin.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão de Entrar com loading */}
      <TouchableOpacity
        style={[
          styleLogin.loginButton,
          loading && styleLogin.buttonDisabled, // Adicionar estilo 'disabled'
        ]}
        onPress={getLogin} // Chama a nova função
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.gray[900] || "#111"} />
        ) : (
          <Text style={styleLogin.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styleLogin.createAccountText}
        onPress={() => (!loading ? navigation.navigate("Cadastro") : null)}
      >
        <Text style={styleLogin.createAccountText}>Não tem conta ainda?</Text>
      </TouchableOpacity>
    </View>
  );
}
