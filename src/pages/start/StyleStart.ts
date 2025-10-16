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
  btns:{
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
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
  description: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 40,
    lineHeight: 20,
  },
});
