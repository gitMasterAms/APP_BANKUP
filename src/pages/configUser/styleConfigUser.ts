import { StyleSheet, Platform } from "react-native";

// Mantendo a mesma paleta de cores para consistência
export const COLORS = {
  background: "#121212",
  surface: "#1E1E1E",
  text: "#FFFFFF",
  gray: "#8E8E93",
  green: "#00AD4A",
  greenDark: "#005223",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Header consistente com a outra tela
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "android" ? 50 : 30,
    bottom: 10,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.green,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Estilos da foto de perfil
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Metade da largura/altura para ser um círculo perfeito
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  changePicText: {
    color: COLORS.green,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  // Estilos do formulário
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 12, // Borda padronizada
    padding: 16,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333", // Borda sutil para definir o campo
  },
  // Estilos dos botões
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  button: {
    flex: 1, // Faz os botões ocuparem espaço igual
    paddingVertical: 16,
    borderRadius: 12, // Borda padronizada, menos arredondada
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: COLORS.green,
    marginLeft: 8, // Espaçamento entre os botões
  },
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    marginRight: 8, // Espaçamento entre os botões
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    color: "#000000", // Texto preto para melhor contraste com o verde
  },
  buttonTextSecondary: {
    color: COLORS.text,
  },
});
