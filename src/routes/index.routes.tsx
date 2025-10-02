import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import Start from "../pages/start";
import { RootStackParamList } from "./types";
import Config from "../pages/configuracoes";
import DrawerRoutes from "./drawer.routes";
import PlansScreen from "../pages/planos";
import { COLORS } from "../pages/configuracoes/styleConfig";
import ConfigUser from "../pages/configUser";

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#09090B",
        },
      }}
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Config" 
        component={Config} 
        options={{
          // mostrar o header nesta tela para ter o botão de voltar
          headerShown: true,
          title: "Configurações",
          headerStyle: {
            backgroundColor: "#09090B",
          },
          headerTintColor: COLORS.green,
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="AppDrawer" component={DrawerRoutes} />
      <Stack.Screen
        name="Planos"
        component={PlansScreen}
        options={{
          // mostrar o header nesta tela para ter o botão de voltar
          headerShown: true,
          title: "Nossos Planos",
          headerStyle: {
            backgroundColor: "#09090B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="ConfigUser" component={ConfigUser} />
    </Stack.Navigator>
  );
}
