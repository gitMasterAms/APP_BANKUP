import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { styles } from "./styleConfig";



export default function Config() {
  const [darkMode, setDarkMode] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tela de Configurações</Text>
      </View>

      <Text style={styles.sectionTitle}>Aparência</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Modo escuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#00C853" : "#fff"}
          trackColor={{ false: "#555", true: "#444" }}
        />
      </View>

      <Text style={[styles.label, { marginTop: 10 }]}>Aumentar tamanho da fonte</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.fontButton}>
          <Text style={styles.fontText}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fontButton}>
          <Text style={styles.fontText}>A-</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Privacidade</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Som das notificações</Text>
        <Switch
          value={notificationSound}
          onValueChange={setNotificationSound}
          thumbColor={notificationSound ? "#00C853" : "#fff"}
          trackColor={{ false: "#555", true: "#444" }}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gerenciar Digitais</Text>
      </TouchableOpacity>
    </View>
  );
}


