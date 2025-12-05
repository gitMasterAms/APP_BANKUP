import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styleHome";
import { colors } from "../../constants/colors";
import { AppTabScreenProps, PayerData, PaymentData } from "../../routes/types";
import { API_URL } from "../../config/api";

type Props = AppTabScreenProps<"Home">;

// ... Componente InfoCard continua igual ...
const InfoCard = ({
  title,
  value,
  subValue,
  icon,
  color,
  fullWidth = false,
}: any) => (
  <View style={[styles.card, fullWidth ? styles.cardFull : styles.cardHalf]}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
    </View>
    <Text style={styles.cardValue}>{value}</Text>
    {subValue && <Text style={styles.cardSubValue}>{subValue}</Text>}
  </View>
);

export default function Home({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Usuário");

  // 1. NOVO ESTADO PARA A FOTO
  const [userImage, setUserImage] = useState<string | null>(null);

  const [cobrancas, setCobrancas] = useState<PaymentData[]>([]);
  const [pagadores, setPagadores] = useState<PayerData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          // Tenta pegar nome e IMAGEM do AsyncStorage primeiro para ser rápido
          const storedName = await AsyncStorage.getItem("userName");
          if (storedName) setUserName(storedName);

          // 2. BUSCA A FOTO SALVA NO CELULAR
          const storedImage = await AsyncStorage.getItem("user_profile_image");
          if (storedImage) setUserImage(storedImage);

          const headers = { Authorization: `Bearer ${token}` };

          const [paymentsResponse, pagadoresResponse, userResponse] =
            await Promise.all([
              fetch(`${API_URL}/financial/payments`, { headers }),
              fetch(`${API_URL}/financial/recurring`, { headers }),
              fetch(`${API_URL}/user/profile`, { headers }),
            ]);

          const paymentsData = await paymentsResponse.json();
          const pagadoresData = await pagadoresResponse.json();

          // Processar dados do usuário
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserName(userData.name);
            await AsyncStorage.setItem("userName", userData.name);

            // Fallback: Se não achou foto no celular (storedImage), tenta ver se veio do banco
            if (!storedImage && userData.avatar_url) {
              setUserImage(userData.avatar_url);
            }
          }

          if (Array.isArray(paymentsData)) setCobrancas(paymentsData);
          if (Array.isArray(pagadoresData)) setPagadores(pagadoresData);
        } catch (error) {
          console.error("Erro ao carregar dashboard", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const pagadorMap = useMemo(() => {
    return new Map(pagadores.map((p) => [p.account_id, p.name]));
  }, [pagadores]);

  const metrics = useMemo(() => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    let totalMes = 0;
    let countTotalMes = 0;
    let totalAberto = 0;
    let countAberto = 0;
    let totalAtrasado = 0;
    let countAtrasado = 0;

    cobrancas.forEach((c) => {
      const dataVenc = new Date(c.due_date);
      const valor = Number(c.amount) || 0;

      if (
        dataVenc.getMonth() === mesAtual &&
        dataVenc.getFullYear() === anoAtual
      ) {
        totalMes += valor;
        countTotalMes++;
      }

      if (dataVenc < hoje) {
        totalAtrasado += valor;
        countAtrasado++;
      } else {
        totalAberto += valor;
        countAberto++;
      }
    });

    return {
      totalMes,
      countTotalMes,
      totalAberto,
      countAberto,
      totalAtrasado,
      countAtrasado,
    };
  }, [cobrancas]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const ultimasAtividades = cobrancas.slice(0, 4);

  if (loading && !userName) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.green[500]} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Ajuste: removi o toggleDrawer da logo para evitar clique acidental duplo, mas pode manter se quiser */}
          <Image
            style={styles.logo}
            source={require("../../assets/images/bankup-branco-e-verde.png")}
          />
        </View>

        <View style={styles.header2}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />

          {/* 3. LÓGICA DO ÍCONE DE PERFIL */}
          <TouchableOpacity onPress={() => navigation.navigate("ConfigUser")}>
            {userImage ? (
              // Se tiver imagem, mostra ela redondinha
              <Image
                source={{ uri: userImage }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16, // Metade da largura/altura para ser círculo
                  marginLeft: 15, // Espaçamento do ícone de notificação
                }}
              />
            ) : (
              // Se não tiver, mostra o ícone padrão
              <FontAwesome
                name="user-circle"
                size={24}
                color="#fff"
                style={{ marginLeft: 15 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Bem-vindo */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bem-vindo, {userName}</Text>
        <Text style={styles.welcomeSubtitle}>
          Visão geral das suas cobranças
        </Text>
      </View>

      {/* Widgets Area */}
      <View style={styles.widgetsContainer}>
        <InfoCard
          title="Cobranças Totais (Este Mês)"
          value={metrics.countTotalMes.toString()}
          subValue={formatCurrency(metrics.totalMes)}
          icon="stats-chart"
          color={colors.green[500]}
          fullWidth
        />

        <View style={styles.row}>
          <InfoCard
            title="Em Aberto"
            value={metrics.countAberto.toString()}
            subValue={formatCurrency(metrics.totalAberto)}
            icon="time"
            color="#FBBF24"
          />

          <InfoCard
            title="Atrasadas"
            value={metrics.countAtrasado.toString()}
            subValue={formatCurrency(metrics.totalAtrasado)}
            icon="alert-circle"
            color="#EF4444"
          />
        </View>
      </View>

      {/* Atividades Recentes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>

        {ultimasAtividades.map((item, index) => {
          const isLate = new Date(item.due_date) < new Date();
          return (
            <View key={item.payment_id || index} style={styles.activityItem}>
              <View style={styles.activityIconBox}>
                <FontAwesome5
                  name={isLate ? "exclamation" : "check"}
                  size={14}
                  color={isLate ? "#EF4444" : colors.green[500]}
                />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                  {isLate ? "Cobrança Atrasada" : "Nova Cobrança"}
                </Text>
                <Text style={styles.activitySub}>
                  {pagadorMap.get(item.account_id) || "Cliente"} -{" "}
                  {formatCurrency(Number(item.amount))}
                </Text>
              </View>
              <Text style={styles.activityDate}>
                {new Date(item.due_date)
                  .toLocaleDateString("pt-BR")
                  .slice(0, 5)}
              </Text>
            </View>
          );
        })}

        {ultimasAtividades.length === 0 && (
          <Text
            style={{
              color: colors.gray[400],
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            Nenhuma atividade recente.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
