import { createContext, useContext } from "react";

export const MainLayoutTabContext = createContext(null)

export const useTab = () => useContext(MainLayoutTabContext);