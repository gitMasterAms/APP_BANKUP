import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import Start from "../pages/start";
import Cadastro from "../pages/cadastro/cadastro";
import CadastroAdicional from "../pages/cadastro-adicional/cadastro-adicional";
import TokenScreen from "../pages/token/token";
import { RootStackParamList } from "./types";
import Config from "../pages/configuracoes";
import DrawerRoutes from "./drawer.routes";
import PlansScreen from "../pages/planos";
import ConfigUser from "../pages/configUser/inde";
import CriandoCobranca from "../pages/cobrancas/criandoCobranca";
import CadastrarPagador from "../pages/pagadores/cadastrar-pagador";
import DetalhesPagador from "../pages/pagadores/detalhes-pagador";
import EditarDadosUser from "../pages/configUser/editarDadosUser";
import EsqueceuSenha from "../pages/esqueceuSenha";
import RedefinirSenha from "../pages/redefinirSenha";

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
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Token" component={TokenScreen} />
      <Stack.Screen name="CadastroAdicional" component={CadastroAdicional} />
      <Stack.Screen name="Config" component={Config} />
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
      <Stack.Screen name="CriandoCobranca" component={CriandoCobranca} />
      <Stack.Screen name="CadastrarPagador" component={CadastrarPagador} />
      <Stack.Screen name="DetalhesPagador" component={DetalhesPagador} />
      <Stack.Screen name="EditarDadosUser" component={EditarDadosUser} />
      <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
    </Stack.Navigator>
  );
}
