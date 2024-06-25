import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/queries";
import { useNavigate } from "react-router-dom";
import { LoginUserResult } from "../SharedTypes";
import TextField from "../UI-Liberary/TextField/TextField"; // Adjust the import path as per your file structure
import "./LoginForm.scss";
import Button from "../UI-Liberary/Button/Button";
const LoginForm: React.FC = () => {
  const [loginUserMutation, { loading, error }] =
    useMutation<LoginUserResult>(LOGIN_USER);
  const navigate = useNavigate();

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
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          Login
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
       
          <div className="button-container">
          <Button size="xlg" colorscheme="primary">
            Login
          </Button>
         </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
