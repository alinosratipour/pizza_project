import React from "react";
import "./Loading.scss";
import loadingGif from "../../assets/img/Pizza-spinning.gif";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
