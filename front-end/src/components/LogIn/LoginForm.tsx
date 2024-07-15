import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/queries";
import { useNavigate } from "react-router-dom";
import { LoginUserResult } from "../SharedTypes";
import TextField from "../../components/UI-Liberary/TextField/TextField";
import { FaUserLock } from "react-icons/fa6";
import Button from "../../components/UI-Liberary/Button/Button";
import "./LoginForm.scss";
import { Link } from "react-router-dom";

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
  
      if (response.data && response.data.loginUser) {
        const { token, user } = response.data.loginUser;
  
        // Check if user.name exists before setting localStorage
        if (user && user.name) {
          localStorage.setItem("userName", user.name);
        }
        if (user.id) {
          localStorage.setItem("userId", String(user.id));
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", user.email); // Assuming user.email is always available
 
  
        navigate("/dashboard");
      } else {
        throw new Error("No data returned from server or loginUser is null");
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
        <div className="icons">
          <FaUserLock />
          <p>Sign In</p>
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
          Login
        </Button>
        {loading && <p>Signing User...</p>}
        {error && <p>Error: {error.message}</p>}
        <p className="createAccount">
          Don't have an account ?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
