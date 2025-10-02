// A tela de boas-vindas deve apenas navegar, não fazer o login
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./StyleStart";
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AppScreenProps } from "../../routes/types";

type Props = AppScreenProps<'Start'>;

export default function Start({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bankup-branco.png")}
      />

      <View style={styles.conteudo}>
        <Image
          source={require("../../assets/images/grafico.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Automatize sua cobrança. Receba sem pedir, lembre sem insistir.
        </Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity 
          style={styles.button}
           onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonCadastrar} 
           onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonTextCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
