import React, { Component, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styleLogin } from "./styleLogin";
import { colors } from "../../constants/colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { Input } from "../../components/input";
import { AppScreenProps } from "../../routes/types";

type Props = AppScreenProps<"Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !senha) {
        return Alert.alert("Atenção", "Informe os campos obrigatórios!");
      }

      navigation.navigate("AppDrawer");

      console.log("LOGOU!");
    } catch (error) {
      console.log(error);
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
        placeholder="mari-mari@gmail.com"
        // value={email}
        // onChangeText={setEmail}
        placeholderTextColor={colors.gray[400]}
        // keyboardType="email-address"
        // autoCapitalize="none"
      />

      <Text style={styleLogin.label}>Senha</Text>
      <TextInput
        style={styleLogin.input}
        placeholder="********"
        // secureTextEntry
        // value={password}
        // onChangeText={setPassword}
        placeholderTextColor={colors.gray[400]}
      />

      <TouchableOpacity>
        <Text style={styleLogin.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styleLogin.loginButton}
        onPress={() => navigation.navigate("AppDrawer")}
      >
        <Text style={styleLogin.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styleLogin.createAccountText}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styleLogin.createAccountText}>Não tem conta ainda?</Text>
      </TouchableOpacity>
    </View>
  );
}
