import { StyleSheet, Platform } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    paddingBottom: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: Platform.OS === "android" ? 50 : 30,
    bottom: 10,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.gray[50],
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Estilos da foto de perfil
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 35,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.gray[450],
  },
  changePicText: {
    color: colors.green[500],
    fontSize: 13,
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
    color: colors.gray[420],
    fontSize: 14,
    marginBottom: 8,
  },
  inputEditar: {
    backgroundColor: colors.gray[980],
    borderRadius: 12,
    padding: 16,
    color: colors.gray[50],
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
    input: {
    borderRadius: 12,
    color: colors.gray[300],
    fontSize: 16,
    borderColor: "#333",
  },
  // Estilos dos botões
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12, 
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: colors.green[500],
    marginLeft: 8,
  },
  buttonSecondary: {
    borderColor: colors.green[500],
    borderWidth: 2,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    color: "#000000",
  },
  buttonTextSecondary: {
    color: colors.green[500],
  },
});