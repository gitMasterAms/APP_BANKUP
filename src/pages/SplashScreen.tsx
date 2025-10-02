// // filepath: c:\Users\JULIANA\Documents\thais\faculdade2\banckup\app-banckup\src\app\SplashScreen.js
// import { View, Text, Image } from "react-native";
// import { useColorScheme } from "react-native";
// import { colors } from "../constants/colors";
// import React from "react";

// export default function SplashScreen() {
//   const colorScheme = useColorScheme();

//   const [appIsReady, setAppIsReady] = React.useState(false);

//   React.useEffect(() => {
//     async function prepare() {
//       try {
//         // Simula o carregamento de recursos (ex: fontes, dados)
//         // Você pode adicionar suas lógicas de carregamento aqui
//         await new Promise((resolve) => setTimeout(resolve, 4000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//         // SplashScreen.hideAsync(); // Esconde a splash screen nativa
//       }
//     }

//     prepare();
//   }, []);

//   if (!appIsReady) {
//     return (
//       <View>
//         <Image
//           source={require("../../assets/images/splashScreen.png")}
//           style={{ width: 200, height: 200 }}
//         />
//       </View>
//     );
//   }

//   // Quando o app estiver pronto, este componente não será mais renderizado
//   // e o conteúdo principal do seu app aparecerá.
//   return null;
// }
