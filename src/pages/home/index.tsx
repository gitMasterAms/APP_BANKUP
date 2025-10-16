import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { styles } from "./styleHome";
import { AppTabScreenProps } from "../../routes/types";
import { Image } from "react-native";

type Props = AppTabScreenProps<"Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/bankup-branco-e-verde.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.header2}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <FontAwesome
            name="user-circle"
            size={24}
            color="#fff"
            onPress={() => navigation.navigate("ConfigUser")}
          />
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Bem-vindo</Text>
        <Text style={styles.subText}>
          Sua cobrança automatizada, começa
          <Text style={styles.highlightText}> AGORA!</Text>
        </Text>

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
