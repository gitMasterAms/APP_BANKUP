import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[990],
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    height: 100,
  },
  conteudo: {
    alignItems: "center",
  },
  logo: {
    marginTop: 20,
    width: 195,
    height: 50,
  },
  image: {
    width: 287,
    height: 200,
  },
  btns: {
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  button: {
    backgroundColor: colors.green[500],
    paddingVertical: 14,
    width: 287,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonCadastrar: {
    borderWidth: 1,
    borderColor: colors.green[500],
    paddingVertical: 14,
    width: 287,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    color: colors.gray[50],
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonTextCadastrar: {
    textAlign: "center",
    color: colors.gray[200],
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: colors.gray[50],
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 40,
    lineHeight: 20,
  },
});
