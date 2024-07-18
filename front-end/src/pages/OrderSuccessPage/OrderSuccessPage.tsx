// OrderSuccessPage.tsx (with animations)

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import "./OrderSuccessPage.scss"

const OrderSuccessPage: React.FC = () => {
  return (
    <motion.div
      className="order-success-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FiCheckCircle size={64} color="#4caf50" />
      <motion.div
        className="order-success-content"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase.</p>

        <Link to="/" className="back-to-home-link">
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccessPage;
