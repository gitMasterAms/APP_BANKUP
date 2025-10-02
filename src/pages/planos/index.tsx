import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppTabScreenProps } from "../../routes/types";

type Props = AppTabScreenProps<"Planos">;

type Feature = {
  text: string;
  available: boolean;
};

type PlanProps = {
  title: string;
  price: string;
  subtitle: string;
  features: Feature[];
};

const PlanCard = ({
  title,
  price,
  subtitle,
  features,
  navigation,
}: PlanProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      <Text style={styles.price}>{price}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {features.map((f, index) => (
        <View style={styles.featureRow} key={index}>
          <Text style={styles.featureText}>{f.text}</Text>
          <Ionicons
            name={f.available ? "checkmark" : "close"}
            size={18}
            color={f.available ? "#00C853" : "red"}
          />
        </View>
      ))}
    </View>
  );
};

export default function PlansScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Escolha o melhor preço!</Text>

      <PlanCard
        title="Grátis"
        price="R$0,00"
        subtitle="6 MESES DE TESTE"
        features={[
          { text: "Gerencie todos os seus clientes", available: true },
          { text: "Crie tags ilimitadas para organizar", available: true },
          { text: "Veja quem está no negativo", available: true },
          { text: "Mande mensagens personalizadas", available: true },
        ]}
      />

      <PlanCard
        title="Básico"
        price="R$0,10"
        subtitle="PARA PEQUENAS EMPRESAS"
        features={[
          { text: "Gerencie até 1.500 clientes", available: true },
          { text: "Crie até 5 tags", available: false },
          { text: "Veja até 15 clientes no negativo", available: true },
          { text: "Mande mensagens personalizadas", available: false },
        ]}
      />

      <PlanCard
        title="Premium"
        price="R$1,00"
        subtitle="PARA GRANDES EMPRESAS"
        features={[
          { text: "Gerencie todos os seus clientes", available: true },
          { text: "Crie tags ilimitadas para organizar", available: true },
          { text: "Veja quem está no negativo", available: true },
          { text: "Mande mensagens personalizadas", available: true },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    padding: 16,
    paddingBottom: 32, 
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    backgroundColor: "#00C853",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#00C853",
    textAlign: "center",
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  featureText: {
    color: "#fff",
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
});
