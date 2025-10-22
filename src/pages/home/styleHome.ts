import { Platform } from "react-native";
import { colors } from "../../constants/colors";
export const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.gray[960],
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    alignItems: "center",
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  header2: {
    flexDirection: "row",
    gap: 30,
  },
  logo: {
    width: 87,
    height: 22,
    marginLeft: 5,
    marginBottom: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  welcomeText: {
    color: colors.gray[50],
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subText: {
    color: colors.gray[50],
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
    backgroundColor: colors.green[500],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    marginTop: 28,
  },
  buttonText: {
    color: colors.gray[50],
    fontSize: 15,
    fontWeight: "bold",
  },
};
