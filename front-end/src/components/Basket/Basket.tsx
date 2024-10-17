import React, { useEffect } from "react";
import EditBasketModal from "./EditBasketModal/EditBasketModal";
import { BasketItem, ToppingType } from "../SharedTypes";
import "./Basket.scss";
import useQuantity from "../Hooks/useQuantityHook";
import Button from "../UI-Liberary/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { CgCloseO } from "react-icons/cg";
import { useNavbarContext } from "../Context/NavbarContext";
import useLocalStorage from "../Hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../Hooks/localStorageKeys";

interface BasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  calculateTotalPrice: () => number;
  toppingsTotal: number;
  onSizeChange?: (newSize: number) => void;
  onBaseChange?: (newBase: string) => void;
  onBasketToppingsChange: (updatedToppings: ToppingType[]) => void;
  onBasketToppingsTotalChange: (total: number) => void;
}

function Basket({
  basket,
  setBasket,
  onSizeChange,
  onBaseChange,
  onBasketToppingsChange,
  onBasketToppingsTotalChange,
}: BasketProps) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedBasketItem, setSelectedBasketItem] =
    React.useState<BasketItem | null>(null);

  const handlePizzaClick = (pizza: BasketItem) => {
    setSelectedBasketItem(pizza);
    setIsEditModalOpen(true);
  };
  const { increaseQuantity, decreaseQuantity } = useQuantity(basket, setBasket);
  const [storedBasket, setStoredBasket] = useLocalStorage<BasketItem[]>(
    LOCAL_STORAGE_KEYS.BASKET,
    []
  );
  // Sync local storage with the basket prop whenever it changes
  useEffect(() => {
    setStoredBasket(basket);
  }, [basket, setStoredBasket]);

  // Sync basket state when the local storage is loaded
  useEffect(() => {
    if (storedBasket.length > 0) {
      setBasket(storedBasket);
    }
  }, [storedBasket, setBasket]);
  
  const handleSaveChanges = (updatedItem: BasketItem) => {
    const updatedBasket = basket.map((item) =>
      item.uniqueId === updatedItem.uniqueId // Use uniqueId for matching
        ? {
            ...updatedItem, // Keep existing properties
            size: updatedItem.size?.toString(), // Update size
            base: updatedItem.base, // Update base
            price: updatedItem.price, // Update price if needed
            basePrice: updatedItem.basePrice, // Update basePrice if needed
            //toppings: updatedItem.toppings, // Update toppings
            toppingsTotal: updatedItem.extraToppingsCost, // Update toppings total
          }
        : item
    );

    setBasket(updatedBasket); // Set the updated basket
    setIsEditModalOpen(false); // Close the modal
    setSelectedBasketItem(null); // Clear the selected item
  };

  const { handleBasketClick, hidePizzaItems } = useNavbarContext();
  return (
    <div className="BasketContainer">
      <span
        className={`basket-icon-container ${hidePizzaItems ? "close" : ""}`}
      >
        <CgCloseO onClick={handleBasketClick} />
      </span>
      <h1 className="title">Basket</h1>

      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul>
            {basket.map((item) => (
              <li key={item.id_pizza}>
                <div className="pizzaNameContainer">
                  <span
                    className="pizzaTitle"
                    onClick={() => handlePizzaClick(item)}
                  >
                    {item.name}
                    <span>{item.size}</span>
                    <span>{item.base}</span>
                  </span>
                  <span>£{(item.price || 0) * item.quantity}</span>
                </div>

                <div className="buttonContainer">
                  <Button
                    onClick={() => increaseQuantity(item)}
                    icon={<IoMdAddCircleOutline style={{ fontSize: "25px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                  <span>{item.quantity}</span>

                  <Button
                    onClick={() => decreaseQuantity(item)}
                    icon={<GrSubtractCircle style={{ fontSize: "22px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                </div>
                <div className="ex">
                  {item.toppings && item.toppings.length > 0 && (
                    <div>
                      <div className="extraToppingTotal">
                        Extra Toppings : £{item.toppingsTotal}
                      </div>
                      <ul>
                        {item.toppings.map((topping, index) => (
                          <li key={index} className="topping">
                            <span className="qty">{topping.name} </span>
                            <span className="qty"> {topping.quantity} </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.removedToppings && item.removedToppings.length > 0 && (
                    <div className="removedTopping">
                      <ul>
                        {item.removedToppings.map((removedTopping, index) => (
                          <li key={index}>
                            No--{" "}
                            <span className="NoTopping">
                              {removedTopping.name}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <hr></hr>
              </li>
            ))}
          </ul>
        </>
      )}

      {isEditModalOpen && (
        <EditBasketModal
          item={selectedBasketItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
          onSizeChange={onSizeChange}
          onBaseChange={onBaseChange}
          onToppingsTotalChange={onBasketToppingsTotalChange}
          onToppingsChange={onBasketToppingsChange}
        />
      )}
    </div>
  );
}

export default Basket;
