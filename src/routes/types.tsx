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
  Cobrancas: {
    editId?: string;
    cobranca?: string;
    cobrancas: PaymentData;
    pagadores: PayerData;
  };
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
  AppDrawer: NavigatorScreenParams<DrawerParamList>;
  Config: undefined;
  Planos: undefined;
  Cadastro: undefined;
  ConfigUser: undefined;
  Token: undefined;
  CadastroAdicional: undefined;
  CriandoCobranca: { editId?: string; cobranca: UserData };
  CadastrarPagador: { editId?: string };
  DetalhesPagador: undefined;
  EditarDadosUser: { currentUserData: UserData };
  EsqueceuSenha: undefined;
};

export type UserData = {
  email?: string;
  name?: string;
  cpf_cnpj?: string;
  phone?: string;
  address?: string;
  birthdate?: string;
};
export type PayerData = {
  account_id: string;
  name: string;
  description: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
};

// Tipo para Cobrança (baseado no CobrancaForm.jsx)
export type PaymentData = {
  payment_id: string;
  account_id: string;
  amount: number;
  description: string;
  due_date: string;
  pix_key: string;
  fine_amount: number;
  interest_rate: number;
  // days_before_due_date não é retornado pela API, apenas enviado
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
