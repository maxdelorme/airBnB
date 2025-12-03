import { ActivityIndicator, View } from "react-native";
const LoadingThrobber = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default LoadingThrobber;
