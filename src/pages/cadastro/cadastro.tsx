import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../constants/colors';

export default function Cadastro({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  function validarEmail(valor: string) {
    return /.+@.+\..+/.test(valor);
  }

  function onCadastrar() {
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
    navigation.navigate('Token', { email });
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
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          placeholderTextColor={colors.gray[400]}
          secureTextEntry
          value={confirma}
          onChangeText={setConfirma}
        />

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={onCadastrar}>
          <Text style={styles.buttonText}>Verificar Email</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Já tem uma conta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Entrar</Text></Text>
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
  buttonText: {
    color: colors.gray[900],
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff5252',
    marginBottom: 8,
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


