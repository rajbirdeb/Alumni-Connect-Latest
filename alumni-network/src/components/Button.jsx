import React from "react";

const Button = ({ children, onClick, className = "", ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
