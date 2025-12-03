import RootNavigator from "../Navigation/RootNavigator";
import { RbnbContextProvider } from "../Context/AuthContext";

export default function Layout() {
  return (
    <RbnbContextProvider>
      <RootNavigator></RootNavigator>
    </RbnbContextProvider>
  );
}
