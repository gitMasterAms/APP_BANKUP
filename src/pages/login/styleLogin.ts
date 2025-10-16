import { colors } from "../../constants/colors";

export const styleLogin = {
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[100],
    marginTop: 30,
    textAlign: "center",
    paddingLeft: 7,
    marginBottom: 35,
  },
  label: {
    alignSelf: "flex-start",
    padding: 15,
    color: colors.gray[400],
    mrginTop: 10,
    fontSize: 15,
  },
  input: {
    width: "100%",
    backgroundColor: colors.gray[450],
    padding: 15,
    borderRadius: 30,
    color: colors.gray[100],
    marginBottom: 5,
  },
  forgotPassword: {
    color: colors.gray[100],
    alignSelf: "flex-end",
    marginBottom: 30,
    marginTop: 8,
    fontSize: 14,
  },
  loginButton: {
    width: 290,
    backgroundColor: colors.green[400],
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: colors.gray[900],
    fontSize: 20,
    fontWeight: "bold",
  },
  createAccountText: {
    color: colors.gray[100],
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
};
