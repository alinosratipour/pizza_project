import { useEffect, useState } from "react";
import Modal from "../UI-Liberary/Modal/Modal";
import Basket from "../Basket/Basket";
import AddPizzaModal from "../AddPizza/AddPizzaModal/AddPizzaModal";
import PizzaItem from "../PizzaItems/PizzaItem";
import { Pizza } from "../SharedTypes";
import useAddToBasket from "../Hooks/useAddToBasketHook";
import useSize from "../Hooks/StateHooks/useSize";
import { useToppings } from "../Context/selectedTopping";
import { usePizzaContext } from "../Context/PizzaContext";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
import { useNavbarContext } from "../Context/NavbarContext";
import "./PizzaMenu.scss";

const PizzaMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
    toppingsTotal,
  } = useToppings();
  const { setRemovedToppings } = useToppingsRemovalFromPizza();
  const { selectedSize, setSelectedSize } = useSize();
  const { hidePizzaItems } = useNavbarContext();
  const {
    pizzaData,
    selectedPizza,
    setSelectedPizza,
    globalLoading,
    pizzaError,
    localLoading,
  } = usePizzaContext();

  useEffect(() => {
    if (selectedSize) {
      setSelectedToppings([]);
      setRemovedToppings([]);
    }

    setToppingsTotal(0);
  }, [selectedSize, setSelectedToppings, setRemovedToppings, setToppingsTotal]);

  const { calculateTotalPrice, basket, setBasket } = useAddToBasket({
    selectedToppings,
  });

  const openAddPizzaModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
  };

  if (globalLoading || localLoading) {
    return (
      <div className="loader-container">
        <p>Loading Pizzas...</p>
      </div>
    );
  }

  if (pizzaError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="container">
      <div className={"pizza-menu-container"}>
        <div
          className={`pizza-items-container ${
            hidePizzaItems ? "hide-pizza-items" : ""
          }`}
        >
          {pizzaData &&
            pizzaData.map((pizza) => (
              <PizzaItem
                key={pizza.id_pizza}
                pizza={pizza}
                onAddPizza={openAddPizzaModal}
              />
            ))}
        </div>
        <div
          className={`basket-container ${hidePizzaItems ? "show-basket" : ""}`}
        >
          <div className="basket-content">
            <Basket
              basket={basket}
              calculateTotalPrice={calculateTotalPrice}
              toppingsTotal={toppingsTotal}
              setBasket={setBasket}
              onBasketToppingsChange={(updatedToppings) =>
                setSelectedToppings(updatedToppings)
              }
              onBasketToppingsTotalChange={(total) => setToppingsTotal(total)}
            />
          </div>

          <div className="basketFooter">
            <span>Total</span>
            <span> £{calculateTotalPrice()}</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPizza && (
          <AddPizzaModal
            selectedPizza={selectedPizza}
            setSelectedSize={setSelectedSize}
            selectedSize={selectedSize}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default PizzaMenu;
