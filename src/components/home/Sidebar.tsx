import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

type Props = DrawerContentComponentProps;

export default function Sidebar({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bankup-branco-e-verde.png")}
      />

      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons
          name="stats-chart"
          size={18}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Gráficos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="bell" size={18} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Notificações</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Pagadores</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("CadastrarPagador")}
        
      >
        <FontAwesome5
          name="user-plus"
          size={17}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Cadastrar Pagador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MainTabs", { screen: "Pagadores" })}>
        <FontAwesome5
          name="address-book"
          size={18}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Pagadores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("CriandoCobranca")}
      >
        <FontAwesome5
          name="file-invoice-dollar"
          size={18}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Cadastrar cobrança</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MainTabs", { screen: "Cobrancas" })}
      >
        <FontAwesome5
          name="receipt"
          size={18}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.menuText}>Cobranças</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Feather
            name="settings"
            size={27}
            color="white"
            onPress={() => navigation.navigate("Config")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: colors.gray[450],
    padding: 15,
    borderRadius: 10,
    color: colors.gray[100],
    marginBottom: 5,
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 17,
    color: "#fff",
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 30,
  },
});
