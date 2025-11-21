import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("access_token") || null
  );

  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refresh_token") || null
  );

  const login = (userData, tokens) => {
    toast.success("Welcome");

    setUser(userData);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    toast.success("Logout Successfully");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        setUser,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
