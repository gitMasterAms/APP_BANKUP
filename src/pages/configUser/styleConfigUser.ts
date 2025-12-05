import { StyleSheet, Platform } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960], // Um fundo escuro
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o título
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 15,
    position: "relative",
    width: "100%",
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gray[450], // Cor de placeholder
    borderWidth: 2,
    borderColor: colors.gray[420],
  },
  changePicText: {
    color: colors.green[400],
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: colors.gray[300],
    fontSize: 14,
    marginBottom: 8,
  },
  // Estilo para texto de visualização (ConfigUser)
  input: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: colors.gray[50],
    fontSize: 16,
    overflow: "hidden", // Garante que o texto não saia da borda
  },
  // Estilo para input editável (EditarDadosUser)
  inputEditar: {
    backgroundColor: colors.gray[450],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: colors.gray[50],
    fontSize: 16,
    borderColor: colors.gray[400],
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50, // Altura mínima para o spinner
  },
  buttonSecondary: {
    backgroundColor: colors.gray[450],
    marginRight: 10, // Espaço entre os botões
  },
  buttonPrimary: {
    backgroundColor: colors.green[500],
    marginLeft: 10, // Espaço entre os botões
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: colors.gray[50],
  },
  buttonTextPrimary: {
    color: colors.gray[900],
  },
  // Estilos de Feedback
  buttonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: "#ff5252", // Vermelho
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
