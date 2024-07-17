//updated: newly added
import React, { createContext, useState } from "react";

export const GlobalStyleContext = createContext();

export const GlobalStyleProvider = ({ children }) => {
  const [globalStyle, setGlobalStyle] = useState({
    color: "black",
    fontFamily: "default",
    backgroundColor: "white",
  });

  return (
    <GlobalStyleContext.Provider value={{ globalStyle, setGlobalStyle }}>
      {children}
    </GlobalStyleContext.Provider>
  );
};
