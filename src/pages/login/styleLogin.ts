import { StyleSheet } from 'react-native'; // Importe o StyleSheet
import { colors } from '../../constants/colors';

// Use StyleSheet.create() para criar os estilos
export const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[100],
    marginTop: 30,
    textAlign: 'center',
    paddingLeft: 7,
    marginBottom: 35,
  },
  label: {
    alignSelf: 'flex-start',
    padding: 15,
    color: colors.gray[400],
    // Havia um erro de digitação aqui: 'mrginTop'
    marginTop: 10,
    fontSize: 15,
  },
  input: {
    width: '100%',
    backgroundColor: colors.gray[450],
    padding: 15,
    borderRadius: 30,
    color: colors.gray[100],
    marginBottom: 5,
  },
  forgotPassword: {
    color: colors.gray[100],
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: 8,
    fontSize: 14,
  },
  loginButton: {
    width: 290,
    backgroundColor: colors.green[400],
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: colors.gray[900],
    fontSize: 20,
    fontWeight: 'bold',
  },
  createAccountText: {
    color: colors.gray[100],
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: '#ff5252', // Vermelho para erros
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: colors.green[700], // Um tom mais escuro
    opacity: 0.7,
  },
});

