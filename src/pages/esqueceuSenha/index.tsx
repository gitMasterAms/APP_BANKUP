import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert, // Importar Alert
  ActivityIndicator, // Importar ActivityIndicator
} from 'react-native';
import { AppStackScreenProps } from '../../routes/types';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'; // Remover FontAwesome5, não é usado aqui
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { API_URL } from '../../config/api'; // Importar API_URL

type Props = AppStackScreenProps<'EsqueceuSenha'>;

export default function EsqueceuSenha({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lógica de envio (do EsquecerSenha.jsx)
  const handleEnviar = async () => {
    // Validação local
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const type = 'password_reset';

      const resposta = await fetch(`${API_URL}/user/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type }),
      });

      const data = await resposta.json(); // Pega a resposta para ler o userId

      if (resposta.ok) {
        // Salva o userId e o type recebidos para a tela de Token usar
        await AsyncStorage.setItem('userId', String(data.userId));
        await AsyncStorage.setItem('type', type);
        await AsyncStorage.setItem('email', email); // Salva o email para a tela de token

        Alert.alert(
          'Enviado!',
          'Enviamos um código de verificação para seu e-mail.',
        );
        navigation.navigate('Token'); // Navega para a tela do Token
      } else {
        setError(
          data.msg ||
            'Não foi possível enviar o e-mail. Verifique se o e-mail está correto.',
        );
      }
    } catch (err) {
      console.error('Erro ao solicitar recuperação:', err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.containerScroll}>
      {/* 1. Cabeçalho CORRIGIDO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        {/* Título corrigido para "Recuperar Senha" e botão "+" removido */}
        <Text style={styles.headerTitle}>Recuperar Senha</Text>
      </View>

      {/* 2. Conteúdo Principal */}
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Enviaremos um código para o seu e-mail para você alterar sua senha.
          </Text>

          <Text style={styles.label}>Digite seu email</Text>

          <TextInput
            style={styles.input}
            placeholder="username@gmail.com"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleEnviar} // Chama a nova função
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// --- ESTILOS (Limpos e unificados, com adições) ---
// (Seu arquivo original tinha estilos duplicados, eu unifiquei)
const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    backgroundColor: colors.gray[960],
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center', // Centraliza o card
    paddingTop: 40, // Espaço do header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o título
    paddingHorizontal: 20, // Espaço para o botão de voltar
    paddingTop: Platform.OS === 'android' ? 50 : 30,
    paddingBottom: 15,
    position: 'relative',
    width: '100%',
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 22, // Ajustado
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 20, // Alinhado com o padding do container
    top: Platform.OS === 'android' ? 50 : 30,
    padding: 4,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#059669',
    padding: 24,
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#FFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#10B981',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff5252',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
});