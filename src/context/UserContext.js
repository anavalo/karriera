import React, { createContext, useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";

export const AuthUserContext = createContext();
export const AuthDispatchContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthUserContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthUserContext.Provider>
  );
};
