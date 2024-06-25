import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/queries";
import { useNavigate } from "react-router-dom";

interface LoginUserResult {
  loginUser: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string | null;
      addresses: {
        id: number;
        address1: string;
        address2: string;
        city: string;
        state: string | null;
        postalCode: string;
        country: string;
      }[];
      createdAt: string; // You might want to use Date type here
      updatedAt: string; // You might want to use Date type here
    };
  };
}

const LoginForm: React.FC = () => {
  const [loginUserMutation, { loading, error }] = useMutation<LoginUserResult>(LOGIN_USER);
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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default LoginForm;
