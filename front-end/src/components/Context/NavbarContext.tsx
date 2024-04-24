import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  hidePizzaItems: boolean;
  handleBasketClick: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [hidePizzaItems, setHidePizzaItems] = useState(false);
 
  const handleBasketClick = () => {
    setHidePizzaItems(!hidePizzaItems);
  };

  return (
    <NavbarContext.Provider value={{ hidePizzaItems, handleBasketClick }}>
      {children}
    </NavbarContext.Provider>
  );
};
