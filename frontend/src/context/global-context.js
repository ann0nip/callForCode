import React, { createContext, useReducer } from "react";
import AppReducer from "./app-reducer";

const initialState = {
  user: {},
  isLoading: false,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setUser(user) {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }

  function setSpinnerStatus(status) {
    dispatch({
      type: "SET_SPINNER_STATUS",
      payload: status,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        setUser,
        setSpinnerStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
