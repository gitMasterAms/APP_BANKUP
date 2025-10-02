import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "./styleConfig"
import { AppStackScreenProps } from "../../routes/types";

type TextSizeType = 'Normal' | 'Grande';
type Props = AppStackScreenProps<"Config">;

export default function Config({ navigation }: Props) {
  // Estados para os toggles e seletores
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [selectedTextSize, setSelectedTextSize] = useState<TextSizeType>('Normal');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, paddingTop: 40 }}>

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
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tamanho do texto</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[styles.segmentButton, selectedTextSize === 'Normal' && styles.segmentButtonActive]}
              onPress={() => setSelectedTextSize('Normal')}
            >
              <Text style={[styles.segmentText, selectedTextSize === 'Normal' && styles.segmentTextActive]}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentButton, selectedTextSize === 'Grande' && styles.segmentButtonActive]}
              onPress={() => setSelectedTextSize('Grande')}
            >
              <Text style={[styles.segmentText, selectedTextSize === 'Grande' && styles.segmentTextActive]}>Grande</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Modo alto contraste</Text>
          <Switch
            value={isHighContrast}
            onValueChange={setIsHighContrast}
            thumbColor={isHighContrast ? COLORS.green : "#f4f3f4"}
            trackColor={{ false: "#767577", true: COLORS.greenDark }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Som das notificações</Text>
           <Switch
            value={notificationSound}
            onValueChange={setNotificationSound}
            thumbColor={notificationSound ? COLORS.green : "#f4f3f4"}
            trackColor={{ false: "#767577", true: COLORS.greenDark }}
          />
        </View>
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