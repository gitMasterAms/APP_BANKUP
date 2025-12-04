import React, { useEffect, useState } from "react"; // Importar useState
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors } from "../../constants/colors";
import { AppStackScreenProps } from "../../routes/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config/api";

type Props = AppStackScreenProps<"CadastroAdicional">;

export default function CadastroAdicional({ navigation }: Props) {
  // 1. Estados para o formulário e controle
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [dateObject, setDateObject] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/user/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.name) {
            // Se já tem nome, está editando
            setIsEditing(true);
            // Preenche os campos
            setNome(data.name || "");
            setTelefone(data.phone || "");
            setCpfCnpj(data.cpf_cnpj || "");
            setEndereco(data.address || "");
          }
        }
      } catch (e) {
        setError("Erro ao carregar dados do perfil.");
      } finally {
        setIsLoadingData(false); // Para de carregar
      }
    };
    loadProfile();
  }, [navigation]);

  if (isLoadingData) {
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator size="large" color={colors.green[400]} />
      </View>
    );
  }

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Primeiro, verifica se o usuário clicou "OK" ou "Cancelar" para fechar
    if (event.type === "set" || event.type === "dismissed") {
      setShowPicker(false);
    }

    // Se ele clicou "OK" (set) E uma data foi selecionada...
    if (event.type === "set" && selectedDate) {
      // Atualiza o objeto Date
      setDateObject(selectedDate);

      // Formata a data para o backend (AAAA-MM-DD)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // +1 (meses são 0-11)
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      // Atualiza o estado 'birthdate' com o string formatado
      setBirthdate(formattedDate);
    }
  };

  const onDateChangeWeb = (dateString: string) => {
    // O onChangeText de um input type="date" na web
    // já retorna o string no formato AAAA-MM-DD.
    setBirthdate(dateString);

    // Opcional: atualizar o dateObject também para manter a consistência
    if (dateString) {
      // Adicionamos T00:00:00 para evitar problemas de fuso horário
      setDateObject(new Date(dateString + "T00:00:00"));
    }
  };

  // 2. Função para concluir o cadastro (lógica do backend)
  const handleConcluir = async () => {
    setIsLoading(true);
    setError(null);

    // Validação local
    if (!nome || !telefone || !cpfCnpj || !endereco || !birthdate) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      // Pega o token principal (que foi salvo pela tela de Token)
      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN ENVIADO PARA /user/profile:", token);
      if (!token) {
        Alert.alert("Erro", "Sessão não encontrada. Faça o login novamente.");
        setIsLoading(false);
        navigation.navigate("Login");
        return;
      }

      // Payload com os dados do perfil
      const profileData = {
        name: nome,
        phone: telefone,
        cpf_cnpj: cpfCnpj,
        address: endereco,
        birthdate: birthdate,
      };

      const httpMethod = isEditing ? "PATCH" : "POST";
      // Endpoint para ATUALIZAR o perfil (PUT /user/profile)
      const response = await fetch(`${API_URL}/user/profile`, {
        method: httpMethod, // Usamos PUT para atualizar o perfil existente
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Autenticação com o token principal
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso!", "Cadastro adicional concluído.");
        // Navega para a home (como no seu código original)
        navigation.navigate("AppDrawer", {
          screen: "MainTabs",
          params: { screen: "Home" },
        });
      } else {
        setError(data.msg || "Erro ao salvar os dados.");
      }
    } catch (err) {
      console.error("Erro no cadastro adicional:", err);
      setError("Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.darkContainer}>
      <StatusBar style="light" />

      <View style={styles.darkFormCard}>
        <Text style={styles.darkFormTitle}>Cadastro adicional</Text>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Nome</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui o seu nome"
            placeholderTextColor={colors.gray[300]}
            value={nome}
            onChangeText={setNome}
            editable={!isLoading}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Telefone</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu telefone"
            placeholderTextColor={colors.gray[300]}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            editable={!isLoading}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>CPF/CNPJ</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu CPF/CNPJ"
            placeholderTextColor={colors.gray[300]}
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
            editable={!isLoading}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Endereço</Text>
          <TextInput
            style={styles.darkFormInput}
            placeholder="Insira aqui seu endereço"
            placeholderTextColor={colors.gray[300]}
            value={endereco}
            onChangeText={setEndereco}
            editable={!isLoading}
          />
        </View>

        <View style={styles.darkFormField}>
          <Text style={styles.fieldLabel}>Data de Nascimento</Text>

          {/* ----- RENDERIZAÇÃO CONDICIONAL AQUI ----- */}
          {Platform.OS === "web" ? (
            // ==================
            // CASO SEJA WEB
            // ==================
            <TextInput
              style={styles.darkFormInput}
              // @ts-ignore // Ignora o erro de 'type' que não existe no RN
              type="date"
              value={birthdate}
              onChangeText={onDateChangeWeb} // Usa o novo handler da web
              placeholder="AAAA-MM-DD"
              placeholderTextColor={colors.gray[300]}
              editable={!isLoading}
            />
          ) : (
            // ==================
            // CASO SEJA MOBILE (iOS/Android)
            // ==================
            <>
              {/* Este é o "botão" falso que mostra a data */}
              <TouchableOpacity
                style={styles.darkFormInput}
                onPress={() => setShowPicker(true)}
                disabled={isLoading}
              >
                <Text
                  style={{
                    color: birthdate ? colors.gray[100] : colors.gray[300],
                  }}
                >
                  {birthdate || "AAAA-MM-DD"}
                </Text>
              </TouchableOpacity>

              {/* O Picker em si. */}
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateObject}
                  mode="date"
                  is24Hour={true}
                  display="spinner" // Mantém "spinner"
                  onChange={onDateChange}
                />
              )}
            </>
          )}
        </View>

        {/* Exibe o erro do servidor ou de validação */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.darkFormButton,
            isLoading && styles.darkFormButtonDisabled, // Estilo desabilitado
          ]}
          onPress={handleConcluir} // Chama a nova função
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.gray[900]} />
          ) : (
            <Text style={styles.darkFormButtonText}>Concluir</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Adicione os estilos 'errorText' e 'darkFormButtonDisabled'
const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: colors.gray[950],
    padding: 20,
  },
  darkFormCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  darkFormTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.gray[100],
    textAlign: "center",
    marginBottom: 40,
  },
  darkFormField: {
    width: "100%",
    marginBottom: 20,
  },
  fieldLabel: {
    color: colors.gray[400],
    marginBottom: 5,
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 10,
  },
  darkFormInput: {
    backgroundColor: colors.gray[450],
    borderRadius: 30,
    padding: 15,
    fontSize: 16,
    color: colors.gray[100],
    width: "100%",
  },
  darkFormButton: {
    width: "100%",
    backgroundColor: colors.green[400],
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  darkFormButtonDisabled: {
    backgroundColor: colors.green[700],
    opacity: 0.8,
  },
  darkFormButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[900],
  },
  errorText: {
    color: "#ff5252",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
