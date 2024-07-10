import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../queries/queries";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import { IoIosCreate } from "react-icons/io";
import "./CheckOutPage.scss";
import { BasketItem, ToppingType } from "../SharedTypes"; // Adjust ToppingType as per your actual type definition

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const basket: BasketItem[] = location.state?.basket || []; // Explicitly type basket as BasketItem[]
  const totalPrice: number = location.state?.totalPrice || 0;
  const [registerUserMutation, { loading, error }] = useMutation(REGISTER_USER);

  const handleCheckout = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address1 = formData.get("address1") as string;
    const address2 = formData.get("address2") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;

    try {
      await registerUserMutation({
        variables: {
          email,
          name,
          password,
          phoneNumber,
          address1,
          address2,
          city,
          state,
          postalCode,
          country,
        },
      });

      // Handle successful registration and order placement
      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          />
        </div>

        <div className="phoneNumber">
          <TextField
            type="tel"
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
          <Button size="xlg" colorscheme="primary">
            Send order
          </Button>
          {loading && <p>Placing Order...</p>}
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
                {item.toppings && ( // Check if item.toppings is defined before mapping
                  <p>
                    {item.toppings && item.toppings.length > 0 && (
                      <p>
                        <strong>Extra Toppings:</strong>{" "}
                        {item.toppings.map(
                          (topping: ToppingType, i: number) => (
                            <span key={i}>
                              {topping.name}
                              {i < item.toppings!.length - 1 ? ", " : ""}
                            </span>
                          )
                        )}
                      </p>
                    )}
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
                {/* {index !== basket.length - 1 && <hr className="line" />}{" "} */}
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
