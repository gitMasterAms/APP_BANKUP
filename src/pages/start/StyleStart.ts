import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    height: 100,
  },
  conteudo:{
    textAlign: "center",
  },
  logo: {
    marginTop: 15,
    width: 200,
    height: 110,
  },
  image: {
    width: 280,
    height: 200,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  btns:{
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
    marginBottom: 45,
  },
  button: {
    backgroundColor: "#00C851",
    paddingVertical: 14,
    width: 287,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonCadastrar: {
    borderWidth: 1,
    borderColor: "#00C851",
    paddingVertical: 14,
    width: 287,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonTextCadastrar:{
    textAlign: "center",
    color: "#c0c0c0ff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
