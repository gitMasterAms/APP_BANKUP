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
  welcomeSection: {
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  welcomeSubtitle: {
    fontSize: 14.6,
    color: colors.gray[300],
    marginTop: 4,
  },
  // Widgets Styles
  widgetsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  card: {
    backgroundColor: colors.gray[900], // Um pouco mais claro que o fundo
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray[420],
  },
  cardFull: {
    width: "100%",
  },
  cardHalf: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 7,
  },
  cardTitle: {
    color: colors.gray[300],
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 8,
  },
  cardValue: {
    color: "#fff",
    fontSize: 29,
    fontWeight: "bold",
  },
  cardSubValue: {
    color: colors.gray[400],
    fontSize: 14,
    marginTop: 4,
  },
  // Recent Activity Styles
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray[900],
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray[420],
  },
  activityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[420],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  activitySub: {
    color: colors.gray[400],
    fontSize: 12,
  },
  activityDate: {
    color: colors.gray[500],
    fontSize: 12,
  },
  // Action Button
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green[500],
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  actionButtonText: {
    color: colors.gray[50],
    fontSize: 15,
    fontWeight: "bold",
  },
};
