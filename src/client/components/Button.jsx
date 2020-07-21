import React from "react";

import "./css/Button.css";

const Button = (props) => {
  const { children, onClick, color } = props;
  const setBackground = () => {
    if (color === "danger") {
      return "#e64848";
    }
    if (color === "primary") {
      return "#95ca3e";
    }
    if (color === "secondary") {
      return "#404eca";
    }
  };
  const setColor = () => {
    if (color === "danger") {
      return "white";
    }
    if (color === "primary") {
      return "black";
    }
    if (color === "secondary") {
      return "white";
    }
  };
  return (
    <>
      <button
        className="Button"
        onClick={onClick}
        style={{ background: setBackground(), color: setColor() }}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
