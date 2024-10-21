import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const getInitialState = () => {
    const state = localStorage.getItem("connect");

    return state !== null
      ? JSON.parse(state)
      : {
          user: null,
          threadList: [],
          selectedThread: null,
        };
  };

  const [context, setContext] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("connect", JSON.stringify(context));
  }, [context]);

  return (
    <MyContext.Provider value={{ context, setContext }}>
      {children}
    </MyContext.Provider>
  );
};
