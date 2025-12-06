import { Tabs } from "expo-router";
import colors from "../../assets/css/colors";
import { Logo } from "../../components";
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
          tabBarLabel: "Home",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
        name="home"
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Map",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="map-marker" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
