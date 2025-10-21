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

type Props = AppTabScreenProps<"Cobrancas">;

// Cores
const COLORS = {
  background: "#121212", // Fundo preto escuro
  primary: "#ffffff", // Texto principal branco
  secondary: "#cccccc", // Texto secundário/título da tela
  cardBackground: "#1e1e1e", // Fundo do card
  statusPending: "#FFBB01", // Laranja para "Aguardando pagamento"
  cardBorder: "#00AD4A", // Verde para borda da cobrança
  headerText: "#3498db", // Azul para o texto "Visualizar cobrança"
  fabBackground: "#ffffff", // Fundo do FAB
  fabIcon: "#000000", // Ícone do FAB
};

// Componente para um Card de Cobrança
// const BillingCard = ({ amount, client, status, dueDate }) => {
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Aguardando pagamento':
//         return { color: COLORS.statusPending, fontWeight: '700' };
//       default:
//         return { color: COLORS.primary };
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardAmount}>Cobrança de **R$ {amount}**</Text>
//       <Text style={styles.cardClient}>{client}</Text>
//       <Text style={[styles.cardStatus, getStatusStyle(status)]}>{status}</Text>
//       <Text style={styles.cardDate}>Vence em: {dueDate}</Text>
//     </View>
//   );
// };

// Componente Principal da Tela
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
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
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
        {/* Card de Cobrança */}
        {/* <BillingCard 
            amount={billingData.amount}
            client={billingData.client}
            status={billingData.status}
            dueDate={billingData.dueDate}
          /> */}

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
    backgroundColor: COLORS.background,
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
    color: COLORS.primary,
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
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.cardBorder,
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
  conteudoDireita: {
    alignItems: "flex-end",
  },
  vencimento: {
    color: COLORS.secondary,
    fontSize: 15,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  clienteValorContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Cliente à esquerda, Valor à direita
    alignItems: "center", // Centraliza verticalmente se um for maior que o outro
    marginBottom: 5,
  },
  valorCobranca: {
    color: COLORS.primary,
    letterSpacing: 2,
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 5,
  },
  cliente: {
    color: COLORS.primary,
    letterSpacing: 1,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 18,
  },
  statusA: {
    fontSize: 18,
    color: COLORS.statusPending,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  statusB: {
    fontSize: 18,
    color: "#ff3232ff",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  statusC: {
    fontSize: 18,
    color: "#14DE6B",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
