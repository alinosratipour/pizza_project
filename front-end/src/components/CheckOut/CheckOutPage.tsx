import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER_DETAILS, GET_USER_DETAILS } from "../../queries/queries";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import { IoIosCreate } from "react-icons/io";
import "./CheckOutPage.scss";
import { BasketItem, ToppingType } from "../SharedTypes";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const basket: BasketItem[] = location.state?.basket || [];
  const totalPrice: number = location.state?.totalPrice || 0;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const getUserIdFromStorage = (): number => {
    const userIdStr = localStorage.getItem("userId");
    if (!userIdStr) {
      // Handle scenario where userId is not found in localStorage
      // Example: Redirect to login page or fetch new userId from server
      return 0; // Return default or handle the scenario appropriately
    }
    const userId = parseInt(userIdStr, 10);
    if (isNaN(userId)) {
      // Handle scenario where userId in localStorage is not a valid number
      return 0; // Return default or handle the scenario appropriately
    }
    return userId;
  };

  const [userId, setUserId] = useState<number>(getUserIdFromStorage());

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_DETAILS, {
    variables: { userId },
    skip: userId === 0,
  });

  useEffect(() => {
    if (userData && userData.getUserDetails) {
      const { name, email, addresses } = userData.getUserDetails;
      setName(name || "");
      setEmail(email || "");
      if (addresses && addresses.length > 0) {
        const primaryAddress = addresses[0];
        setAddress1(primaryAddress.address1 || "");
        setAddress2(primaryAddress.address2 || "");
        setCity(primaryAddress.city || "");
        setPostalCode(primaryAddress.postalCode || "");
        setPhoneNumber(primaryAddress.phoneNumber || "");
      }
    }
  }, [userData]);

  const [
    updateUserMutation,
    { loading: updateUserLoading, error: updateUserError },
  ] = useMutation(UPDATE_USER_DETAILS);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedAddresses = [
        {
          address1,
          address2,
          city,
          postalCode,
      
          phoneNumber, // Include phoneNumber field
        },
      ];

      await updateUserMutation({
        variables: {
          userId,
          name,
          email,
          addresses: updatedAddresses,
        },
      });
      console.log("User details updated successfully!");
    } catch (error) {
      console.error("Update user details error:", error);
    }
  };

  if (userLoading) return <p>Loading user details...</p>;
  if (userError) return <p>Error: {userError.message}</p>;

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
            disabled={!!name}
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
          />
        </div>

        <div className="phoneNumber">
          <TextField
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            inputSize="large"
            value={phoneNumber}
            borderWidth="1px"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="address1">
          <TextField
            type="text"
            name="address1"
            placeholder="Address Line 1"
            inputSize="large"
            value={address1}
            borderWidth="1px"
            onChange={(e) => setAddress1(e.target.value)}
            required={!address1}
          />
        </div>
        <div className="address2">
          <TextField
            type="text"
            name="address2"
            placeholder="Address Line 2"
            inputSize="large"
            value={address2}
            borderWidth="1px"
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
        <div className="city">
          <TextField
            type="text"
            name="city"
            placeholder="City"
            inputSize="large"
            value={city}
            borderWidth="1px"
            onChange={(e) => setCity(e.target.value)}
            required={!city}
          />
        </div>

        <div className="postalCode">
          <TextField
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            inputSize="large"
            value={postalCode}
            borderWidth="1px"
            onChange={(e) => setPostalCode(e.target.value)}
            required={!postalCode}
          />
        </div>

        <div className="buttonContainer">
          <Button size="xlg" colorscheme="primary" type="submit">
            Place Order
          </Button>
          {updateUserLoading && <p>Updating user details...</p>}
          {updateUserError && <p>Error: {updateUserError.message}</p>}
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
                    {item.toppings
                      .map((topping: ToppingType) => topping.name)
                      .join(", ")}
                  </p>
                )}
                {item.removedToppings && item.removedToppings.length > 0 && (
                  <p>
                    <strong>Removed Toppings:</strong>{" "}
                    {item.removedToppings
                      .map((removedTopping: ToppingType) => removedTopping.name)
                      .join(", ")}
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
