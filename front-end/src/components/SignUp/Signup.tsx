import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_USER } from "../../queries/queries";
import { useNavigate } from "react-router-dom";
import { SignUpUserResult } from "../SharedTypes";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import { IoIosCreate } from "react-icons/io";
import "./Signup.scss";

const Signup: React.FC = () => {
  const [signUpUserMutation, { loading, error }] =
    useMutation<SignUpUserResult>(SIGN_UP_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignup = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const response = await signUpUserMutation({
        variables: {
          email,
          password,
          name,
        },
      });
  
      if (response.data) {
        const { token, user } = response.data.signUpUser;
        const userId = user.id; // Extract userId from the user object
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId.toString()); // Store userId as string
        navigate("/checkout"); // Redirect to checkout or dashboard
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

    handleSignup(email, password, name);
  };

  return (
    <div className="signupContainer">
      <form onSubmit={handleSubmit} className="form">
        <div className="icons">
          <IoIosCreate />
          <p> Sign Up</p>
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
        <Button size="lg" colorscheme="primary" type="submit">
          Register
        </Button>
        {loading && <p>Registering User...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;
