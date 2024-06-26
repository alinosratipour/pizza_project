import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Optionally, return null or a loading spinner
  }

  return (
    <>
      <h1>Welcome to Dashboard</h1>
    </>
  );
};

export default DashBoard;
