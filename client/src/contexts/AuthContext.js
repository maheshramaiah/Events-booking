import React, { useReducer, useContext } from 'react';

const AuthContext = React.createContext();

function getInitialState() {
  const token = localStorage.getItem('token') || null;

  return {
    isLoggedIn: !!token,
    token
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'login': {
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isLoggedIn: true,
        token: action.token
      }
    }
    case 'logout': {
      localStorage.setItem('token', '');
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    }
  }
}

export default function AuthProvider(props) {
  const value = useReducer(reducer, getInitialState());

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}