import { StyleSheet, Platform } from "react-native";

// Centralizando as cores para fácil manutenção
export const COLORS = {
  background: "#121212",
  surface: "#1E1E1E", // Cor para os cards das seções
  primary: "#FFFFFF",
  text: "#FFFFFF",
  gray: "#8E8E93",
  green: "#00AD4A",
  greenDark: "#005223", // Cor para o "track" do switch
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
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
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray,
    marginBottom: 8,
    textTransform: "uppercase", 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 17,
    color: COLORS.text,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontSize: 17,
    color: COLORS.gray,
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
    color: COLORS.text,
    fontSize: 15,
  },
  segmentTextActive: {
    fontWeight: "bold",
  },
});
