import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/queries";
import { useNavigate } from "react-router-dom";
import { LoginUserResult } from "../SharedTypes";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import Button from "../../components/UI-Liberary/Button/Button";
import "./LoginForm.scss";

const LoginForm: React.FC = () => {
  const [loginUserMutation, { loading, error }] =
    useMutation<LoginUserResult>(LOGIN_USER);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUserMutation({
        variables: { email, password },
      });

      if (response.data) {
        localStorage.setItem("token", response.data.loginUser.token);
        navigate("/dashboard");
      } else {
        throw new Error("No data returned from server");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    handleLogin(email, password);
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="form">
        Sign In
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
          Login
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
