import { Stack } from "expo-router";
import { useRbnbContext } from "../Context/AuthContext";

const RootNavigator = () => {
  const { userID } = useRbnbContext();

  return (
    <Stack>
      <Stack.Protected guard={!userID}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={userID}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootNavigator;
