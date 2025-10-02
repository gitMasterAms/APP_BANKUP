import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "./types"; 
import TabRoutes from "./tab.routes";
import Sidebar from "../components/home/Sidebar";

const Drawer = createDrawerNavigator<DrawerParamList>(); // Use o tipo aqui

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="MainTabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}