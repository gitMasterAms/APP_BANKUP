import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "./types";
import TabRoutes from "./tab.routes";
import AppDrawer from "../components/home/Sidebar";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <AppDrawer {...props} />}>
      <Drawer.Screen
        name="MainTabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
