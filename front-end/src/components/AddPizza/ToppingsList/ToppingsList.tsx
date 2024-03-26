import { ToppingType } from "../../SharedTypes";
import { useEffect, useState } from "react";
import classnames from "classnames";
import "./ToppingsList.scss";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../../UI-Liberary/Button/Button";
interface ToppingsListProps {
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  availableToppings?: ToppingType[] | undefined;
  refetchToppings?: (idSize: number) => Promise<void>;
  selectedToppings?: ToppingType[];
}
function ToppingsList({
  availableToppings,
  selectedToppings,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const [toppingQuantities, setToppingQuantities] = useState<{
    [key: string]: number;
  }>({});
  useEffect(() => {
    if (availableToppings) {
      // Reset topping quantities to 0 when the component mounts
      const initialQuantities = availableToppings.reduce(
        (acc, topping) => ({ ...acc, [topping.name]: 0 }),
        {}
      );
      setToppingQuantities(initialQuantities);
    }
  }, [availableToppings]);
  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const handleAddClick = (topping: ToppingType) => {
    onAddTopping(topping);

    // Update topping quantity
    setToppingQuantities((previousToppingQuantities) => {
      const currentQuantity = previousToppingQuantities[topping.name] || 0;

      // Check if the quantity is less than 10 before incrementing
      const newToppingQuantity =
        currentQuantity < 10 ? currentQuantity + 1 : currentQuantity;

      return {
        ...previousToppingQuantities,
        [topping.name]: newToppingQuantity,
      };
    });
  };

  const handleRemoveClick = (topping: ToppingType) => {
    onRemoveTopping(topping);

    // Update topping quantity
    setToppingQuantities((previousToppingQuantities) => ({
      ...previousToppingQuantities,
      [topping.name]: Math.max(
        (previousToppingQuantities[topping.name] || 0) - 1,
        0
      ),
    }));
  };

  return (
    <div className="ToppingListContainer">
      {availableToppings &&
        availableToppings.map((topping, index) => (
          <div
            key={index}
            className={classnames({
              "in-Basket": isToppingInBasket(topping),
              "in-ToppingList": toppingQuantities[topping.name] > 0,
              "in-Default": toppingQuantities[topping.name] === 0,
              "in-Green": toppingQuantities[topping.name] === 1,
            })}
          >
            <div className="list-Container">
              <div className="ToppingName-Container">
                {toppingQuantities[topping.name] > 0 && (
                  <span className="Topping-Qauntity">
                    {toppingQuantities[topping.name]}
                  </span>
                )}
                <div className="Topping-Name">{topping.name}</div>
                <div>£{topping.price}</div>
              </div>

              {(isToppingInBasket(topping) && (
                <>
                  <Button
                    onClick={() => handleRemoveClick(topping)}
                    icon={<GrSubtractCircle style={{ fontSize: "22px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>

                  <Button
                    onClick={() => handleAddClick(topping)}
                    icon={<IoMdAddCircleOutline style={{ fontSize: "25px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                </>
              )) ||
                (toppingQuantities[topping.name] > 0 ? (
                  <>
                    <Button
                      onClick={() => handleRemoveClick(topping)}
                      icon={<GrSubtractCircle style={{ fontSize: "22px" }} />}
                      colorscheme="gost-secondery"
                      size="sm"
                      iconPosition="right"
                    ></Button>

                    <Button
                      onClick={() => handleAddClick(topping)}
                      icon={
                        <IoMdAddCircleOutline style={{ fontSize: "25px" }} />
                      }
                      colorscheme="gost-primary"
                      size="sm"
                      iconPosition="right"
                    ></Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleAddClick(topping)}
                    icon={<IoMdAddCircleOutline style={{ fontSize: "25px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ToppingsList;
