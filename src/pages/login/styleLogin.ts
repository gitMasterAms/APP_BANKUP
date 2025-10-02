import { colors } from "../../constants/colors";

export const styleLogin = {
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.gray[100],
    marginBottom: 35,
    alignSelf: "center",
    paddingLeft: 7,
  },
  label: {
    fontSize: 19,
    color: colors.gray[400],
    alignSelf: "flex-start",
    marginTop: 15,
    paddingLeft: 7,
  },
  input: {
    width: "100%",
    backgroundColor: colors.gray[450],
    padding: 15,
    borderRadius: 30,
    color: colors.gray[100],
    fontSize: 16,
  },
  forgotPassword: {
    color: colors.gray[100],
    alignSelf: "flex-end",
    marginBottom: 30,
    fontSize: 14,
  },
  loginButton: {
    width: 290,
    backgroundColor: colors.green[400],
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: colors.gray[900],
    fontSize: 20,
    fontWeight: "bold",
  },
  createAccountText: {
    color: colors.gray[100],
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
};
