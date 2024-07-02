import React from "react";
import { useContext, useState } from "react";

export const DisplayContext = React.createContext();

export function DisplayElementProvider({children}) {
  const [currentEle, setCurrentEle] = useState("");

  return (
    <DisplayContext.Provider value={{ currentEle, setCurrentEle }}>
      {children}
    </DisplayContext.Provider>
  );
}

export const useDisplay=()=>{return useContext(DisplayContext)};

