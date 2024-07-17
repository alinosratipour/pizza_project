import React from "react";
import TextField from "../UI-Liberary/TextField/TextField";
import Button from "../UI-Liberary/Button/Button";
import { IoIosCreate } from "react-icons/io";

interface CheckoutFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  address1: string;
  setAddress1: React.Dispatch<React.SetStateAction<string>>;
  address2: string;
  setAddress2: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  updateUserLoading: boolean;
  updateUserError: Error | undefined;
  handlePlaceOrder: () => void; // Define the function type
}

const AddressForm: React.FC<CheckoutFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  address1,
  setAddress1,
  address2,
  setAddress2,
  city,
  setCity,
  postalCode,
  setPostalCode,
  updateUserLoading,
  updateUserError,
  handlePlaceOrder, // Receive the function prop
}) => {
  return (
    <div className="form">
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
        <Button
          size="xlg"
          colorscheme="primary"
          onClick={handlePlaceOrder} // Handle place order on button click
        >
          Place Order
        </Button>
        {updateUserLoading && <p>Updating user details...</p>}
        {updateUserError && <p>Error: {updateUserError.message}</p>}
      </div>
    </div>
  );
};

export default AddressForm;
