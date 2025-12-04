import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert, // Importar Alert
  ActivityIndicator, // Importar ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStackScreenProps } from "../../routes/types";
import { colors } from "../../constants/colors";
import { API_URL } from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Agora o tipo Props inclui 'route' para podermos pegar o 'editId'
type Props = AppStackScreenProps<"CadastrarPagador">;

export default function CadastrarPagador({ navigation, route }: Props) {
  // Pegar o editId dos parâmetros da rota
  const editId = route.params?.editId;

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // useEffect para buscar dados do pagador se estiver em modo de edição
  useEffect(() => {
    if (editId) {
      const fetchPagador = async () => {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem("token");
          const response = await fetch(
            `${API_URL}/financial/recurring/${editId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            // Preenche o formulário com os dados do servidor
            setNomeCompleto(data.name || "");
            setDescricao(data.description || ""); 
            setCpfCnpj(data.cpf_cnpj || "");
            setEmail(data.email || "");
            setTelefone(data.phone || "");
          } else {
            Alert.alert(
              "Erro",
              data.msg || "Não foi possível buscar os dados do cliente."
            );
          }
        } catch (error) {
          console.error("Erro ao buscar pagador:", error);
          Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor.");
        } finally {
          setLoading(false);
        }
      };

      fetchPagador();
    }
  }, [editId]); // Executa quando 'editId' mudar

  // Função de salvar (lógica do desktop)
  const handleSalvar = async () => {
    setLoading(true);
    setErro(null);

    // Validação básica
    if (!nomeCompleto || !cpfCnpj || !email || !telefone) {
      setErro("Por favor, preencha todos os campos obrigatórios!");
      setLoading(false);
      return;
    }

    // Monta o payload 
    const pagadorData = {
      name: nomeCompleto,
      description: descricao, 
      cpf_cnpj: cpfCnpj,
      email: email,
      phone: telefone,
    };

    try {
      const token = await AsyncStorage.getItem("token");
      // Define a URL e o Método (Criação ou Edição)
      const url = editId
        ? `${API_URL}/financial/recurring/${editId}`
        : `${API_URL}/financial/recurring`;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pagadorData),
      });

      if (response.ok) {
        Alert.alert(
          "Sucesso!",
          editId
            ? "Cliente atualizado com sucesso!"
            : "Cliente cadastrado com sucesso!"
        );
        navigation.goBack(); 
      } else {
        const errorData = await response.json();
        setErro(errorData.msg || "Erro ao salvar cliente.");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setErro("Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    if (!loading) {
      navigation.goBack();
    }
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
          {editId ? "Editar Cliente" : "Dados do Cliente"}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          {editId
            ? "Atualize os dados do cliente."
            : "Crie um novo cliente para suas cobranças!"}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor={colors.gray[400]}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Pagamento do Aluguel Apt 101"
            placeholderTextColor={colors.gray[400]}
            value={descricao}
            onChangeText={setDescricao}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF/CNPJ *</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            placeholderTextColor={colors.gray[400]}
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            placeholderTextColor={colors.gray[400]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            placeholderTextColor={colors.gray[400]}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>
      </View>

      {/* Exibe o erro do servidor ou de validação */}
      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.cancelarButton,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleCancelar}
          disabled={loading}
        >
          <Text style={styles.cancelarButtonText}>CANCELAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.salvarButton,
            loading && styles.buttonDisabled,
          ]}
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
  inputWithIcon: {
    position: "relative",
  },
  dropdownIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
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
  // ESTILOS ADICIONADOS
  error: {
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
