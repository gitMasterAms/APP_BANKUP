import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./StyleStart";
import { AppStackScreenProps } from "../../routes/types";

type Props = AppStackScreenProps<"Start">;

export default function Start({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bankup-branco-e-verde.png")}
      />

      <View style={styles.conteudo}>
        <Image
          source={require("../../assets/images/grafico.png")}
          style={styles.image}
          resizeMode="contain"
        />

      </View>

      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCadastrar}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonTextCadastrar}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Automatize sua cobrança. Receba sem pedir, {'\n'} lembre sem insistir.
        </Text>
      </View>
    </View>
  );
}
