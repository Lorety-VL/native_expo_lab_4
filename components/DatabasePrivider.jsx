import { createContext, useState } from "react";

export const DBContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [isInit, setIsInit] = useState(false);  

  return (
    <DBContext.Provider value={{ isInit, setIsInit }}>
      {children}
    </DBContext.Provider>
  );
};
