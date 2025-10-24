import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Pagadores from "../pages/pagadores";
import { TabParamList } from "./types";
import { CustomTabBar } from "../components/CustomTabBar";
import Cobrancas from "../pages/cobrancas";

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#09090B",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#00FF00", // Cor do ícone ativo
        tabBarInactiveTintColor: "#FFFFFF", // Cor dos ícones inativos
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cobrancas" component={Cobrancas} />
      <Tab.Screen name="Pagadores" component={Pagadores} />
    </Tab.Navigator>
  );
}
