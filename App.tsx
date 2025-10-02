import 'react-native-gesture-handler' 

import Routes from "./src/routes/index.routes";
import {NavigationContainer} from '@react-navigation/native'

import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // opcional, para manter o fundo
  },
});
