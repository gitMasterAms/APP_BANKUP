import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, // Importar o Alert nativo
  ActivityIndicator, // Para o feedback de carregamento
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar o AsyncStorage
import { API_URL } from '../../config/api'; // Importar a URL da API

export default function Cadastro({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  // 1. Hook para verificar se o usuário já está logado (similar ao desktop)
  useEffect(() => {
    const verificarToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        try {
          const res = await fetch(`${API_URL}/user/check`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();

          if (data.valid === true) {
            // Se já estiver logado, redireciona para a Home (ou sua rota principal de app)
            navigation.navigate('Home'); // Ajuste 'Home' se o nome da rota for outro
          }
          // Se não for válido, o AsyncStorage será limpo ou o token expirará
          // e o usuário permanecerá na tela de cadastro/login.
        } catch (err) {
          console.log('Erro ao verificar o token:', err);
          // Em caso de erro de rede, mantém na página
        }
      }
    };

    verificarToken();
  }, [navigation]);

  function validarEmail(valor: string) {
    return /.+@.+\..+/.test(valor);
  }

  // 2. Função de cadastro atualizada com a lógica de API
  async function onCadastrar() {
    // Mantém as validações locais
    if (!validarEmail(email)) {
      return setErro('Informe um e-mail válido.');
    }
    if (!senha || senha.length < 6) {
      return setErro('A senha deve ter pelo menos 6 caracteres.');
    }
    if (senha !== confirma) {
      return setErro('As senhas não coincidem.');
    }
    
    setErro(null);
    setIsLoading(true); // Inicia o carregamento

    try {
      const resposta = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
          confirmpassword: confirma, // Nome do campo igual ao do desktop
        }),
      });

      if (resposta.ok) {
        // Sucesso no cadastro
        Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login'); // Navega para o Login
      } else {
        // Erro vindo do servidor (ex: e-mail já existe)
        const erroData = await resposta.json();
        setErro(erroData.msg || 'Erro ao cadastrar. Verifique os dados.');
      }
    } catch (erro) {
      // Erro de rede
      console.error('Erro na requisição:', erro);
      setErro('Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="digite seu e-mail"
          placeholderTextColor={colors.gray[400]}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading} // Desabilita edição durante o carregamento
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          editable={!isLoading}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={confirma}
          onChangeText={setConfirma}
          editable={!isLoading}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {/* 3. Botão com feedback de carregamento */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]} // Estilo de desabilitado
          onPress={onCadastrar}
          disabled={isLoading} // Desabilita o botão durante o carregamento
        >
          {isLoading ? (
            <ActivityIndicator color={colors.gray[900]} /> // Mostra o spinner
          ) : (
            <Text style={styles.buttonText}>Verificar Email</Text> // Mostra o texto
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Já tem uma conta?{' '}
          <Text
            style={styles.link}
            onPress={() => (isLoading ? null : navigation.navigate('Login'))} // Não permite navegação se estiver carregando
          >
            Entrar
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
  title: {
    color: colors.gray[100],
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: colors.gray[400],
    marginBottom: 6,
    marginLeft: 6,
    fontSize: 14,
  },
  input: {
    width: '100%',
    backgroundColor: colors.gray[450],
    color: colors.gray[100],
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 14,
  },
  button: {
    width: 290,
    backgroundColor: colors.green[400],
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.green[700], // Um pouco mais escuro para indicar 'disabled'
  },
  buttonText: {
    color: colors.gray[900],
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff5252', // Vermelho para erros
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerText: {
    color: colors.gray[100],
    textAlign: 'center',
    marginTop: 14,
  },
  link: {
    color: colors.green[400],
    fontWeight: 'bold',
  },
});
