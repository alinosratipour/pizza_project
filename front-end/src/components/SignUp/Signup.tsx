import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../queries/queries"; // Ensure you have this query defined
import { useNavigate } from "react-router-dom";
import { RegisterUserResult } from "../SharedTypes"; // Adjust this as per your actual type definition
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import "./Signup.scss"; // Your CSS file for styling

const Signup: React.FC = () => {
  const [registerUserMutation, { loading, error }] =
    useMutation<RegisterUserResult>(REGISTER_USER);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignup = async (
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  ) => {
    try {
      const response = await registerUserMutation({
        variables: {
          email,
          password,
          name,
          phoneNumber,
          address1,
          address2,
          city,
          state,
          postalCode,
          country,
        },
      });

      if (response.data) {
        localStorage.setItem("token", response.data.registerUser.token);
        navigate("/dashboard");
      } else {
        throw new Error("No data returned from server");
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address1 = formData.get("address1") as string;
    const address2 = formData.get("address2") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;

    handleSignup(
      email,
      password,
      name,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      postalCode,
      country
    );
  };

  return (
    <div className="signupContainer">
    <form onSubmit={handleSubmit} className="form">
      Sign Up
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
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          inputSize="large"
          borderWidth="1px"
          required
        />
      </div>
      <div className="password">
        <TextField
          type="password"
          name="password"
          placeholder="Password"
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
      <div className="state">
        <TextField
          type="text"
          name="state"
          placeholder="State"
          inputSize="large"
          borderWidth="1px"
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
      <div className="country">
        <TextField
          type="text"
          name="country"
          placeholder="Country"
          inputSize="large"
          borderWidth="1px"
          required
        />
      </div>
      <Button size="lg" colorscheme="primary" type="submit">
        Register
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  </div>
  
  );
};

export default Signup;
