import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  AppStackScreenProps,
  PayerData,
  PaymentData,
} from "../../routes/types";
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"CriandoCobranca">;

// Helper para formatar YYYY-MM-DD -> DD/MM/AAAA
const formatarDeISO = (isoDate: string): string => {
  if (!isoDate || !isoDate.includes("-")) return "";
  const [ano, mes, dia] = isoDate.split("T")[0].split("-");
  return `${dia}/${mes}/${ano}`;
};

// Helper para formatar DD/MM/AAAA -> YYYY-MM-DD
const formatarParaISO = (data: string): string => {
  if (!data || data.length < 10) return "";
  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}-${dia}`;
};

export default function CriandoCobranca({ navigation, route }: Props) {
  const editId = route.params?.editId;
  const cobranca = route.params?.cobranca;

  // Estados para o formulário (baseado no CobrancaForm.jsx)
  const [pagadorId, setPagadorId] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataVencimento, setDataVencimento] = useState(""); // DD/MM/AAAA
  const [pixKey, setPixKey] = useState("");
  const [multa, setMulta] = useState("");
  const [jurosMes, setJurosMes] = useState("");
  const [notificarDias, setNotificarDias] = useState("0");

  // Estados para o Dropdown
  const [pagadores, setPagadores] = useState<PayerData[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [pagadorSelecionado, setPagadorSelecionado] = useState(
    "Selecione um cliente"
  );

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [loadingPagadores, setLoadingPagadores] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // 1. Busca pagadores para o Dropdown
  useEffect(() => {
    const fetchPagadores = async () => {
      setLoadingPagadores(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/financial/recurring`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPagadores(data);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível carregar os clientes.");
      } finally {
        setLoadingPagadores(false);
      }
    };
    fetchPagadores();
  }, []);

  // 2. Preenche o formulário se estiver em "Modo de Edição"
  useEffect(() => {
    if (cobranca && editId) {
      setPagadorId(cobranca.account_id);
      // Encontra o nome do pagador para exibir no dropdown
      const nomePagador = pagadores.find(
        (p) => p.account_id === cobranca.account_id
      )?.name;
      setPagadorSelecionado(nomePagador || "Cliente não encontrado");

      setValor(String(cobranca.amount || ""));
      setDescricao(cobranca.description || "");
      setDataVencimento(formatarDeISO(cobranca.due_date));
      setPixKey(cobranca.pix_key || "");
      setMulta(String(cobranca.fine_amount || ""));
      setJurosMes(String(cobranca.interest_rate || ""));
      // 'days_before_due_date' não é salvo no backend, então não é preenchido
    }
  }, [cobranca, editId, pagadores]); // Roda quando os pagadores também carregarem

  // 3. Lógica de Salvar (do CobrancaForm.jsx)
  const handleSalvar = async () => {
    setLoading(true);
    setErro(null);

    // Validação
    if (!pagadorId || !valor || !dataVencimento || !pixKey) {
      setErro("Preencha os campos obrigatórios (*).");
      setLoading(false);
      return;
    }

    // Monta o payload
    const paymentData = {
      account_id: pagadorId,
      amount: Number(valor.replace(",", ".")) || 0,
      description: descricao,
      due_date: formatarParaISO(dataVencimento),
      pix_key: pixKey,
      fine_amount: Number(multa.replace(",", ".")) || 0,
      interest_rate: Number(jurosMes.replace(",", ".")) || 0,
      days_before_due_date: Number(notificarDias) || 0,
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const url = editId
        ? `${API_URL}/financial/payments/${editId}`
        : `${API_URL}/financial/payments`;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      const resData = await response.json();
      if (response.ok) {
        Alert.alert(
          "Sucesso!",
          editId ? "Cobrança atualizada!" : "Cobrança criada!"
        );
        navigation.goBack();
      } else {
        throw new Error(resData.msg || "Erro ao salvar cobrança.");
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionarPagador = (pagador: PayerData) => {
    setPagadorId(pagador.account_id);
    setPagadorSelecionado(pagador.name);
    setDropdownAberto(false);
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editId ? "Editar" : "Criar"} Cobrança
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          {editId
            ? "Atualize os dados da cobrança."
            : "Crie uma nova cobrança para seu cliente!"}
        </Text>

        {/* --- Dropdown de Pagador (Cliente) --- */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Selecione seu Cliente *</Text>
          <View>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownAberto(!dropdownAberto)}
              disabled={loadingPagadores || loading}
            >
              <Text style={styles.dropdownText}>{pagadorSelecionado}</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.gray[400]}
              />
            </TouchableOpacity>

            {dropdownAberto && (
              <View style={styles.dropdownMenu}>
                {loadingPagadores ? (
                  <ActivityIndicator />
                ) : (
                  pagadores.map((p) => (
                    <TouchableOpacity
                      key={p.account_id}
                      style={styles.dropdownItem}
                      onPress={() => handleSelecionarPagador(p)}
                    >
                      <Text style={styles.dropdownItemText}>{p.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
        </View>

        {/* --- Formulário (Campos da API Web) --- */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor *</Text>
          <TextInput
            style={styles.input}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.gray[400]}
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mensalidade, Aluguel"
            placeholderTextColor={colors.gray[400]}
            value={descricao}
            onChangeText={setDescricao}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chave Pix *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email, CPF, CNPJ, ou chave aleatória"
            placeholderTextColor={colors.gray[400]}
            value={pixKey}
            onChangeText={setPixKey}
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de vencimento *</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.gray[400]}
            value={dataVencimento}
            onChangeText={setDataVencimento}
            keyboardType="numeric"
            maxLength={10}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Multa (Valor Fixo)</Text>
          <TextInput
            style={styles.input}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.gray[400]}
            value={multa}
            onChangeText={setMulta}
            keyboardType="decimal-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Juros ao mês (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1"
            placeholderTextColor={colors.gray[400]}
            value={jurosMes}
            onChangeText={setJurosMes}
            keyboardType="decimal-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notificar (dias antes) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 3"
            placeholderTextColor={colors.gray[400]}
            value={notificarDias}
            onChangeText={setNotificarDias}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        {erro && <Text style={styles.errorText}>{erro}</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cancelarButton, loading && styles.buttonDisabled]}
            onPress={handleCancelar}
            disabled={loading}
          >
            <Text style={styles.cancelarButtonText}>CANCELAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.salvarButton, loading && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.gray[900]} />
            ) : (
              <Text style={styles.salvarButtonText}>SALVAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: "center", // Centraliza Título
    paddingHorizontal: 20, // Espaço para botão
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 35,
    paddingBottom: 15,
  },
  backButton: {
    position: "absolute",
    left: 20, // Alinhado
    top: Platform.OS === "android" ? 50 : 30,
    height: 40,
    width: 40,
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 22, // Ajustado
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionText: {
    color: colors.gray[300],
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: colors.gray[300],
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: colors.gray[50],
    fontSize: 16,
  },
  // Dropdown
  dropdownButton: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    color: colors.gray[50], // Cor do texto selecionado
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.gray[400],
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[500],
  },
  dropdownItemText: {
    color: colors.gray[50],
    fontSize: 16,
  },
  // Botões
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },
  cancelarButton: {
    flex: 1,
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: "center",
  },
  cancelarButtonText: {
    color: colors.gray[50],
    fontSize: 16,
    fontWeight: "bold",
  },
  salvarButton: {
    flex: 1,
    backgroundColor: colors.green[500],
    borderRadius: 10,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: "center",
  },
  salvarButtonText: {
    color: colors.gray[900],
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff5252",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
