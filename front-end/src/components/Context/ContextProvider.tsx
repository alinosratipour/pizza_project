import React, { ReactNode } from "react";
import { BaseProvider } from "./BaseContext";
import { SizeProvider } from "./SizeContext";
import { LoadingProvider } from "./LoadingContext";
import { PizzaProvider } from "./PizzaContext";
import { ToppingsProvider } from "./selectedTopping";
import { BasketProvider } from "./BasketContext";
import {NavbarProvider} from "./NavbarContext"

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => (
  <LoadingProvider>
    <NavbarProvider>
    <BasketProvider>
      <ToppingsProvider>
        <BaseProvider>
          <SizeProvider>
            {/* <PizzaProvider>{children}</PizzaProvider> */}
            <PizzaProvider>
              {children}
            </PizzaProvider>
            
          </SizeProvider>
        </BaseProvider>
      </ToppingsProvider>
    </BasketProvider>
    </NavbarProvider>
  </LoadingProvider>
);

export default ContextProvider;
