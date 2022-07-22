import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, Action) => {
  const { type, payload } = Action;
  switch (type) {
    case 'LOGIN':
      return { ...state, user: payload };

    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log('AuthCOntext state:', state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
