import React, { useState } from 'react'; // Importar useState
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert, // Importar Alert
  ActivityIndicator, // Importar ActivityIndicator
} from 'react-native';
import { colors } from '../../constants/colors';
import { AppStackScreenProps } from '../../routes/types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { API_URL } from '../../config/api'; // Importar API_URL

type Props = AppStackScreenProps<'CadastroAdicional'>;

export default function CadastroAdicional({ navigation }: Props) {
  // 1. Estados para o formulário e controle
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Função para concluir o cadastro (lógica do backend)
  const handleConcluir = async () => {
    setIsLoading(true);
    setError(null);

    // Validação local
    if (!nome || !telefone || !cpfCnpj || !endereco) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      // Pega o token principal (que foi salvo pela tela de Token)
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Sessão não encontrada. Faça o login novamente.');
        setIsLoading(false);
        navigation.navigate('Login');
        return;
      }

      // Payload com os dados do perfil
      const profileData = {
        name: nome,
        phone: telefone,
        cpf_cnpj: cpfCnpj,
        address: endereco,
        // O campo 'birthdate' do perfil.jsx não está neste form,
        // então enviamos apenas o que temos.
      };

      // Endpoint para ATUALIZAR o perfil (PUT /user/profile)
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT', // Usamos PUT para atualizar o perfil existente
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Autenticação com o token principal
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Cadastro adicional concluído.');
        // Navega para a home (como no seu código original)
        navigation.navigate('AppDrawer', {
          screen: 'MainTabs',
          params: { screen: 'Home' },
        });
      } else {
        setError(data.msg || 'Erro ao salvar os dados.');
      }
    } catch (err) {
      console.error('Erro no cadastro adicional:', err);
      setError('Erro de conexão com o servidor. Tente novamente.');
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  darkFormTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray[100],
    textAlign: 'center',
    marginBottom: 40,
  },
  darkFormField: {
    width: '100%',
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
    width: '100%',
  },
  darkFormButton: {
    width: '100%',
    backgroundColor: colors.green[400],
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  darkFormButtonDisabled: {
    backgroundColor: colors.green[700],
    opacity: 0.8,
  },
  darkFormButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  errorText: {
    color: '#ff5252',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});