import { Stack } from "expo-router";
import colors from "../assets/css/colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.defaultBG,
        },
      }}
    />
  );
}
