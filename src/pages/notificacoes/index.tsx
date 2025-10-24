import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppStackScreenProps<"Notificacoes">;

export default function Notificacoes({ navigation }: Props) {
  // Dados de exemplo das notificações
  const notificacoes = [
    {
      id: 1,
      texto: "João Silva acaba de receber sua notificação de cobrança via whatsapp.",
      cor: colors.gray[970],
    },
    {
      id: 2,
      texto: "Maria Santos acaba de enviar o valor cobrado da categoria Aluguel!",
      cor: colors.green[500],
    },
    {
      id: 3,
      texto: "Pedro Oliveira acaba de receber sua notificação de cobrança via email.",
      cor: colors.gray[970],
    },
    {
      id: 4,
      texto: "Ana Costa acaba de enviar o valor cobrado da categoria Condomínio!",
      cor: colors.green[500],
    },
    {
      id: 5,
      texto: "Carlos Mendes acaba de receber sua notificação de cobrança via whatsapp.",
      cor: colors.gray[970],
    },
  ];

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleVoltar}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Últimas horas</Text>
        
        {notificacoes.map((notificacao) => (
          <View
            key={notificacao.id}
            style={[
              styles.notificationItem,
              { backgroundColor: notificacao.cor }
            ]}
          >
            <Text style={styles.notificationText}>
              {notificacao.texto}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    position: "relative",
    width: "100%",
    marginBottom: 35,
    height: Platform.OS === "android" ? 100 : 80,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "android" ? 50 : 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.gray[50],
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  notificationItem: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
  },
  notificationText: {
    color: colors.gray[50],
    fontSize: 16,
    lineHeight: 22,
  },
});
