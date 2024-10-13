import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [context, setContext] = useState({
    user: null,
    threadList: [],
    selectedThread: null,
  });

  const ctx = localStorage.getItem("connect");
  if (ctx && context.user === null) {
    setContext(JSON.parse(ctx));
  }

  return (
    <MyContext.Provider value={{ context, setContext }}>
      {children}
    </MyContext.Provider>
  );
};
