import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_USER_DETAILS,
  GET_USER_DETAILS,
  CREATE_ORDER,
} from "../../queries/queries";
import "./CheckOutPage.scss";
import { BasketItem } from "../SharedTypes";
import AddressForm from "./AddressForm";
import BasketReview from "./BasketReview";

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
    if (!userIdStr || isNaN(parseInt(userIdStr, 10))) {
      return 0;
    }
    return parseInt(userIdStr, 10);
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

  const [
    createOrderMutation,
    { loading: createOrderLoading, error: createOrderError },
  ] = useMutation(CREATE_ORDER);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedAddresses = [
        { address1, address2, city, postalCode, phoneNumber },
      ];    
      await updateUserMutation({
        variables: { userId, name, email, addresses: updatedAddresses },
      });

      const orderItems = basket.map(item => ({
        productId: item.id_pizza,
        quantity: item.quantity,
        price: item.price,
        toppings: item.toppings?.map(topping => topping.name) || [],
      }));

      await createOrderMutation({
        variables: {
          userId,
          addressId: userData.getUserDetails.addresses[0].id,
          paymentType: "Card",
          status: "Pending",
          totalAmount: totalPrice,
          items: orderItems,
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
      <AddressForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        address1={address1}
        setAddress1={setAddress1}
        address2={address2}
        setAddress2={setAddress2}
        city={city}
        setCity={setCity}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        handleSubmit={handleSubmit}
        updateUserLoading={updateUserLoading}
        updateUserError={updateUserError}
      />

      <BasketReview basket={basket} totalPrice={totalPrice} />
    </div>
  );
};

export default CheckoutPage;
