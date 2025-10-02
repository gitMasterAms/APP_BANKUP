import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { TabParamList } from "../routes/types";

type IconProps = { color: string; size: number };

const icons: Record<keyof TabParamList, (props: IconProps) => JSX.Element> = {
  Home: (props) => <Feather name="home" {...props} />,
  Notificacoes: (props) => <Feather name="bell" {...props} />,
  Status: (props) => <FontAwesome5 name="dollar-sign" {...props} />,
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? "#10B981" : "#FFFFFF";

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused && styles.iconContainerFocused,
              ]}
            >
              {/* Renderiza o ícone correspondente */}
              {icons[route.name as keyof TabParamList]({ color: "#ece2e2ff", size: 24 })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#18181B", // Cor de fundo da sua barra
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
},
iconContainerFocused: {
    backgroundColor: "#00C851", // Círculo verde quando a aba está ativa
  },
});
