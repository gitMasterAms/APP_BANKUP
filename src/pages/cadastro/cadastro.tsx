import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/colors";
import { API_URL } from "../../config/api"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
};

export default function Cadastro({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Adicionar estado de loading

  function validarEmail(valor: string) {
    return /.+@.+\..+/.test(valor);
  } // Alterada para função assíncrona para lidar com a API

  async function onCadastrar() {
    setErro(null); // Limpa erros anteriores // 1. Validação local (mantida)

    if (!validarEmail(email)) {
      return setErro("Informe um e-mail válido.");
    }
    if (!senha || senha.length < 6) {
      return setErro("A senha deve ter pelo menos 6 caracteres.");
    }
    if (senha !== confirma) {
      return setErro("As senhas não coincidem.");
    }

    setLoading(true); // Inicia o loading

    try {
      // 2. Etapa 1: Registrar o usuário
      const registerRes = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha,
          confirmpassword: confirma, // Chave conforme solicitado
        }),
      });

      if (!registerRes.ok) {
        const erroData = await registerRes.json();
        setErro(
          erroData.msg || "Erro ao Tentar Cadastrar. Tente outro e-mail."
        );
        setLoading(false);
        return;
      }

      const registerData = await registerRes.json();
      const userId = registerData.id; // Assumindo que a rota retorna o ID // Salva dados para a próxima tela (similar ao fluxo de login)

      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("userId", String(userId)); // O tipo aqui provavelmente é de verificação de conta
      const type = "account_verification";
      await AsyncStorage.setItem("type", type); // 3. Etapa 2: Enviar código de verificação (similar ao fluxo de login)

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
          "Cadastro realizado! Enviamos um código de verificação para o seu e-mail."
        );
        navigation.navigate("Token"); // Navega para a tela de Token
      } else {
        const erroCode = await sendCodeRes.json();
        setErro(erroCode.msg || "Erro ao enviar o código de verificação.");
      }
    } catch (err) {
      console.error("Erro geral no cadastro:", err);
      setErro("Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setLoading(false); // Para o loading em qualquer cenário (sucesso ou erro)
    }
  }

  return (
    <View style={styles.container}>
            <StatusBar style="light" />     {" "}
      <View style={styles.card}>
                <Text style={styles.title}>Criar Conta</Text>       {" "}
        <Text style={styles.label}>E-mail</Text>       {" "}
        <TextInput
          style={styles.input}
          placeholder="digite seu e-mail"
          placeholderTextColor={colors.gray[400]}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading} // Desativa input durante o loading
        />
                <Text style={styles.label}>Senha</Text>       {" "}
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          editable={!loading} // Desativa input durante o loading
        />
                <Text style={styles.label}>Confirmar Senha</Text>       {" "}
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={confirma}
          onChangeText={setConfirma}
          editable={!loading} // Desativa input durante o loading
        />
                {erro ? <Text style={styles.error}>{erro}</Text> : null}       {" "}
        <View style={styles.novo}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]} // Estilo de desabilitado
            onPress={onCadastrar}
            disabled={loading} // Desativa o botão durante o loading
          >
                     {" "}
            {loading ? (
              <ActivityIndicator color={colors.gray[900] || "#111"} />
            ) : (
              <Text style={styles.buttonText}>Verificar Email</Text>
            )}
                   {" "}
          </TouchableOpacity>
                 {" "}
          <Text style={styles.footerText}>
                      Já tem uma conta?          {" "}
            <Text
              style={styles.link}
              onPress={() => (!loading ? navigation.navigate("Login") : null)} // Proteção contra clique durante o loading
            >
                          Entrar          {" "}
            </Text>
                   {" "}
          </Text>
               {" "}
        </View>
      </View>
         {" "}
    </View>
  );
}

const styles = StyleSheet.create({
  novo:{
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
  title: {
    color: colors.gray[100],
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: colors.gray[400],
    marginBottom: 6,
    marginLeft: 6,
    fontSize: 14,
  },
  input: {
    width: "100%",
    backgroundColor: colors.gray[450],
    color: colors.gray[100],
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 14,
  },
  button: {
    width: 295,
    backgroundColor: colors.green[400],
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonDisabled: {
    opacity: 0.7, // Estilo para o botão desabilitado
  },
  buttonText: {
    color: colors.gray[900],
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#ff5252",
    marginBottom: 8,
    textAlign: "center", // Centralizar o erro
  },
  footerText: {
    color: colors.gray[100],
    textAlign: "center",
    marginTop: 14,
  },
  link: {
    color: colors.green[400],
    fontWeight: "bold",
  },
});
