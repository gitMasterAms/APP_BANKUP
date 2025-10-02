import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { AppScreenProps } from "../../routes/types";

type Props = AppScreenProps<'Sidebar'>;

export default function Sidebar({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BankUp</Text>

      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="stats-chart" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Gráficos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="time" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Histórico</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Clientes</Text>
      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="money-bill-wave" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Criar cobrança</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="people" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="person-add" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Cadastrar clientes</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image
          style={styles.avatar}
          onPress={() => navigation.navigate('Config')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // fundo preto
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 15,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    color: "#fff",
  },
  footer: {
    marginTop: "auto", // empurra para baixo
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
