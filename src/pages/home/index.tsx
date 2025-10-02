import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { styles } from "./styleHome";
import { AppTabScreenProps } from "../../routes/types";

type Props = AppTabScreenProps<"Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>BankUp</Text>
        <TouchableOpacity>
          <Feather
            name="settings"
            size={24}
            color="white"
            onPress={() => navigation.navigate("Config")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Bem-vindo</Text>
        <Text style={styles.subText}>
          Sua cobrança automatizada, começa
          <Text style={styles.highlightText}> AGORA!</Text>
        </Text>

        {/* Botão de chamada para ação */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Planos")}
        >
          <Ionicons
            name="flash"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Venha conhecer nossos planos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
