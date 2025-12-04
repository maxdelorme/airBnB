import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const rbnbContext = createContext();

export const RbnbContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const setInitValues = async () => {
    const tokenStorage = await AsyncStorage.getItem("token");
    const IdStorage = await AsyncStorage.getItem("id");

    setUserID(IdStorage || null);
    setUserToken(tokenStorage || null);

    router.navigate("/(main)/home/rooms");
  };

  useEffect(() => {
    setInitValues();
  }, []);

  const login = async (id, token) => {
    setUserID(id);
    setUserToken(token);

    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("token", token);

    alert("t'est authentifié");
    router.navigate("/(main)/home/rooms");
  };
  const logout = async () => {
    setUserToken(null);
    setUserID(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    alert("bye");
  };

  const value = {
    userID,
    userToken,
    login,
    logout,
  };

  return <rbnbContext.Provider value={value}>{children}</rbnbContext.Provider>;
};

export const useRbnbContext = () => {
  const context = useContext(rbnbContext);

  if (context === undefined)
    throw new Error("useRbnbContext must be used within a rbnbContextProvider");

  return context;
};
