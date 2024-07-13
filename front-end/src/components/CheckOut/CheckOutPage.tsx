import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_DETAILS } from "../../queries/queries";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import { IoIosCreate } from "react-icons/io";
import "./CheckOutPage.scss";
import { BasketItem, ToppingType } from "../SharedTypes";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const basket: BasketItem[] = location.state?.basket || []; // Explicitly type basket as BasketItem[]
  const totalPrice: number = location.state?.totalPrice || 0;

  const [name, setName] = useState<string>(() => localStorage.getItem("userName") || "");
  const [email, setEmail] = useState<string>(() => localStorage.getItem("userEmail") || "");

  const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER_DETAILS);

  const handleCheckout = async (formData: FormData) => {
    const phoneNumber = formData.get("phoneNumber") as string;
    const address1 = formData.get("address1") as string;
    const address2 = formData.get("address2") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postalCode") as string;

    try {
      await updateUserMutation({
        variables: {
          email,
          name,
          phoneNumber,
          address1,
          address2,
          city,
          postalCode,
        },
      });

      console.log("User details updated successfully!");
    } catch (error) {
      console.error("Update user details error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    handleCheckout(formData);
  };

  return (
    <div className="checkoutContainer">
      <form onSubmit={handleSubmit} className="form">
        <div className="icons">
          <IoIosCreate />
          <p>Checkout</p>
        </div>

        <div className="name">
          <TextField
            type="text"
            name="name"
            placeholder="Name"
            inputSize="large"
            borderWidth="1px"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!name} // Disable if name is prepopulated
          />
        </div>
        <div className="email">
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            inputSize="large"
            borderWidth="1px"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!email} // Disable if email is prepopulated
          />
        </div>

        <div className="phoneNumber">
          <TextField
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            inputSize="large"
            borderWidth="1px"
            required
          />
        </div>
        <div className="address1">
          <TextField
            type="text"
            name="address1"
            placeholder="Address Line 1"
            inputSize="large"
            borderWidth="1px"
            required
          />
        </div>
        <div className="address2">
          <TextField
            type="text"
            name="address2"
            placeholder="Address Line 2"
            inputSize="large"
            borderWidth="1px"
          />
        </div>
        <div className="city">
          <TextField
            type="text"
            name="city"
            placeholder="City"
            inputSize="large"
            borderWidth="1px"
            required
          />
        </div>

        <div className="postalCode">
          <TextField
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            inputSize="large"
            borderWidth="1px"
            required
          />
        </div>

        <div className="buttonContainer">
          <Button size="xlg" colorscheme="primary" type="submit">
            Place Order
          </Button>
          {loading && <p>Updating user details...</p>}
          {error && <p>Error: {error.message}</p>}
        </div>
      </form>

      <div className="basketReview">
        <h2 className="title">Review Your Order</h2>

        {basket.map((item: BasketItem, index: number) => (
          <div key={index} className="basketItem">
            <p className="pizzaName">{item.name}</p>
            <div className="wrapper">
              <div className="subItemsLeft">
                <p>
                  <strong>Size:</strong> {item.size}
                </p>
                <p>
                  <strong>Base:</strong> {item.base}
                </p>
                <p>
                  <strong>Price:</strong> £{(item.price ?? 0).toFixed(2)}
                </p>
              </div>
              <div className="subItemsRight">
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                {item.toppings && (
                  <p>
                    <strong>Extra Toppings:</strong>{" "}
                    {item.toppings.map((topping: ToppingType, i: number) => (
                      <span key={i}>
                        {topping.name}
                        {i < item.toppings!.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                )}
                {item.removedToppings && item.removedToppings.length > 0 && (
                  <p>
                    <strong>Removed Toppings:</strong>{" "}
                    {item.removedToppings.map(
                      (removedTopping: ToppingType, i: number) => (
                        <span key={i} className="removedToppings">
                          {removedTopping.name}
                          {i < item.removedToppings!.length - 1 ? ", " : ""}
                        </span>
                      )
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        <h2>Total Price: £{totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CheckoutPage;
