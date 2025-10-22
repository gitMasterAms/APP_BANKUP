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
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: Platform.OS === "android" ? 50 : 30,
    position: "relative",
    width: "100%",
    marginBottom: 25,
  },
  headerTitle: {
    color: colors.gray[50],
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0, 
    top: Platform.OS === "android" ? 55 : 30,
  },
  logo: {
    width: 100,
    height: 40,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.gray[50],
    marginTop: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[420],
    marginBottom: 8,
    textTransform: "uppercase", 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray[980],
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 17,
    color: colors.gray[50],
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontSize: 17,
    color: colors.gray[420],
    marginRight: 8,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 2,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 7,
  },
  segmentButtonActive: {
    backgroundColor: "#555",
  },
  segmentText: {
    color: colors.gray[50],
    fontSize: 15,
  },
  segmentTextActive: {
    fontWeight: "bold",
  },
});
