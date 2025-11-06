import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppStackScreenProps } from '../../routes/types';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

type Props = AppStackScreenProps<'RedefinirSenha'>;

export default function RedefinirSenha({ navigation }: Props) {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Proteção: se o usuário chegar aqui sem resetToken, volta ao início do fluxo
  useEffect(() => {
    const verificarToken = async () => {
      const resetToken = await AsyncStorage.getItem('resetToken');
      if (!resetToken) {
        Alert.alert(
          'Erro',
          'Sessão inválida. Por favor, comece o processo novamente.'
        );
        navigation.navigate('EsqueceuSenha');
      }
    };
    verificarToken();
  }, [navigation]);

  const handleSubmit = async () => {
    setError(null);

    // Validações locais
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmar) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const resetToken = await AsyncStorage.getItem('resetToken');
      if (!resetToken) {
        Alert.alert('Erro', 'Token de redefinição não encontrado.');
        navigation.navigate('EsqueceuSenha');
        setLoading(false);
        return;
      }

      const resposta = await fetch(`${API_URL}/user/password-reset`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resetToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: senha }),
      });

      if (resposta.ok) {
        Alert.alert('Sucesso!', 'Senha redefinida com sucesso!');
        
        // Limpa todos os dados temporários usados no fluxo
        await AsyncStorage.removeItem('resetToken');
        await AsyncStorage.removeItem('userId');

        navigation.navigate('Login');
      } else {
        const erro = await resposta.json();
        setError(erro.msg || 'Não foi possível redefinir a senha. O token pode ter expirado.');
      }
    } catch (err: any) {
      console.error('Erro ao redefinir senha:', err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Redefinir Senha</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Redefinir senha</Text>
          <Text style={styles.subtitle}>
            Digite sua nova senha abaixo.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nova senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              placeholderTextColor={colors.gray[400]}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar nova senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita a nova senha"
              placeholderTextColor={colors.gray[400]}
              secureTextEntry
              value={confirmar}
              onChangeText={setConfirmar}
              editable={!loading}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.gray[900]} />
            ) : (
              <Text style={styles.buttonText}>Redefinir senha</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 30,
    paddingBottom: 15,
    position: 'relative',
    width: '100%',
    marginBottom: 35,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'android' ? 50 : 30,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#059669',
    padding: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
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


