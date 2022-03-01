import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  setToken: () => {},
  setIsLoggedIn: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        setToken,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
