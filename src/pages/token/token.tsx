import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { AppStackScreenProps } from "../../routes/types";

type Props = AppStackScreenProps<'Token'>;

export default function TokenScreen({ navigation }: Props) {
  const [code, setCode] = useState<string>("");

  const handleVerify = () => {
    navigation.navigate("CadastroAdicional");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verificação de Segurança</Text>
        <Text style={styles.subtitle}>
          Enviamos um código para seu e-mail. Digite-o abaixo para continuar.
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
        />

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verificar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resendText}>Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    backgroundColor: 'transparent',
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
});


