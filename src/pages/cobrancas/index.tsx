import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { AppTabScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";

type Props = AppTabScreenProps<"Cobrancas">;

export default function Cobrancas({ navigation }: Props) {
  // Dados de exemplo ( substituir isso por dados da API)
  // const billingData = {
  //   amount: '5500,00',
  //   client: 'Ana carolina mandas peres',
  //   status: 'Aguardando pagamento',
  //   dueDate: '22/09/2025',
  // };

  // const handleAddBilling = () => {
  //   console.log('Botão de adicionar cobrança pressionado');
  //   // Lógica para navegar para a tela de criação de cobrança
  // };

  // const handleMenuPress = () => {
  //   console.log('Botão de menu pressionado');
  //   // Lógica para abrir um menu lateral, por exemplo
  // };

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
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cobranças</Text>

        <TouchableOpacity>
          <FontAwesome5
            name="plus"
            size={23}
            color="#fff"
            onPress={() => navigation.navigate("CriandoCobranca")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.clienteValorContainer}>
            <Text style={styles.cliente}>Thais Simon</Text>
            <Text style={styles.vencimento}>Vence em: 28/10/2025</Text>
          </View>
          <Text style={styles.valorCobranca}>R$1.200</Text>
          <Text style={styles.statusA}>Aguardando Pagamento</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.clienteValorContainer}>
            <Text style={styles.cliente}>Leoncio</Text>
            <Text style={styles.vencimento}>Vence em: 28/11/2025</Text>
          </View>
          <Text style={styles.valorCobranca}>R$1.500</Text>
          <Text style={styles.statusB}>Pagamento Atrasado</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.clienteValorContainer}>
            <Text style={styles.cliente}>Macaco Pirado</Text>
            <Text style={styles.vencimento}>Vence em: 20/10/2025</Text>
          </View>
          <Text style={styles.valorCobranca}>R$1.800</Text>
          <Text style={styles.statusC}>Pagamento Feito</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 35,
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 25,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: Platform.OS === "android" ? 55 : 30,
  },

  // --- Estilos do Conteúdo e Card ---
  content: {
    flex: 1,
    gap: 30,
  },
  card: {
    backgroundColor: colors.gray[970],
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: colors.green[500],
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    flexDirection: "column",
  },
  primeiraLinhaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  vencimento: {
    color: colors.gray[200],
    fontSize: 13,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  clienteValorContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Cliente à esquerda, Valor à direita
    alignItems: "center", // Centraliza verticalmente se um for maior que o outro
    marginBottom: 5,
  },
  cliente: {
    color: colors.gray[50],
    fontSize: 20,
    fontWeight: "500",
    marginTop: 18,
  },
  valorCobranca: {
    color: colors.gray[50],
    letterSpacing: 2,
    fontSize: 19,
    fontWeight: "400",
    marginBottom: 5,
  },
  statusA: {
    fontSize: 14,
    color: colors.colorido[20],
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  statusB: {
    fontSize: 14,
    color: colors.colorido[10],
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  statusC: {
    fontSize: 14,
    color: colors.green[600],
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
