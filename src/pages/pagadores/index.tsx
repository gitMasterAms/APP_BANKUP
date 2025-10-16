import { Text } from "react-native";
import { colors } from "../../constants/colors";


export function Pagadores(){
    return(
        <Text style={styles.container}>Olá, voce chegou a tela de Pagadores</Text>
    );
}

export const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.gray[450],
    color: colors.gray[100],
    paddingTop: 50,
    fontSize: 22,
  }
}