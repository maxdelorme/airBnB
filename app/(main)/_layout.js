import { Tabs } from "expo-router";
import colors from "../../assets/css/colors";
import { Logo } from "../../components";
import { Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: true,
        headerTitle: () => <Logo height="40" />,
        contentStyle: {
          backgroundColor: colors.defaultBG,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? colors.primary : color }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="home"
              size={size}
              color={focused ? colors.primary : color}
            />
          ),
        }}
        name="home"
      ></Tabs.Screen>
    </Tabs>
  );
}
