import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "./styleConfig";
import { AppStackScreenProps } from "../../routes/types";

type TextSizeType = "Normal" | "Grande";
type Props = AppStackScreenProps<"Config">;

export default function Config({ navigation }: Props) {
  // Estados para os toggles e seletores
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [selectedTextSize, setSelectedTextSize] =
    useState<TextSizeType>("Normal");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} 
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("ConfigUser")}
        >
          <Text style={styles.rowLabel}>Editar perfil</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aparência</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Modo escuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            thumbColor={isDarkMode ? COLORS.green : "#f4f3f4"}
            trackColor={{ false: "#767577", true: COLORS.greenDark }}
          />
        </View>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Idioma</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.rowValue}>Português (Brasil)</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Alterar senha</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Gerenciar digitais</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
