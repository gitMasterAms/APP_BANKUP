import { colors } from "../../constants/colors";
export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 30, // Espaçamento superior para dispositivos iOS com notch
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50, // Espaçamento para não ficar colado na barra inferior
  },
  welcomeText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
  },
  highlightText: {
    fontWeight: "bold",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00C853",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    marginTop: 28,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
};
