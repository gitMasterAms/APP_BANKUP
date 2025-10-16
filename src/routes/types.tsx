import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Mapa para as telas DENTRO das Abas (Tabs)
export type TabParamList = {
  Home: undefined;
  Pagadores: undefined;
  Clientes: undefined;
};

// Mapa para as telas DENTRO da Gaveta (Drawer)
export type DrawerParamList = {
  // A rota principal do Drawer será o conjunto de abas
  MainTabs: NavigatorScreenParams<TabParamList>;
  // Adicione outras telas que você quer no menu gaveta aqui
};

// Mapa para o Navegador Principal (Stack)
export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Config: undefined;
  Planos: undefined;
  Cadastro: undefined;
  ConfigUser: undefined;
  Token: undefined;
  CadastroAdicional: undefined;
  // A rota principal após o login será o conjunto da gaveta
  AppDrawer: NavigatorScreenParams<DrawerParamList>;
};

// Helper para telas do Stack
export type AppStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// Helper para telas do Drawer
export type AppDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

// Helper para telas das Tabs
export type AppTabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    AppDrawerScreenProps<keyof DrawerParamList>
  >;