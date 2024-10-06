import { useLocation } from "react-router-dom";

export const useBasketVisibility = (globalLoading: boolean, localLoading: boolean) => {
  const location = useLocation();
  const hiddenBasketRoutes = ["/", "/checkout"];

  // Check if the current route should hide the basket
  const hideBasket = hiddenBasketRoutes.includes(location.pathname);

  // If loading states are false and the basket is not on a hidden route, show the basket
  const showBasketIcon = !globalLoading && !localLoading && !hideBasket;

  return showBasketIcon;
};
