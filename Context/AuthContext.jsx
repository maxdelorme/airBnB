import { createContext, useState, useContext } from "react";

const rbnbContext = createContext();

export const RbnbContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setUserID("ID");
    setUserToken("token");
    alert("t'est authentifié");
  };
  const logout = () => {
    setUserToken(null);
    setUserID(null);
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
