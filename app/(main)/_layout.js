import { Tabs } from "expo-router";
import colors from "../../assets/css/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: colors.defaultBG,
        },
      }}
    />
  );
}
