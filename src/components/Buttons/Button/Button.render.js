import React from "react";

const ButtonsButton = ({ children, action }) => (
  <button onClick={action}>{children}</button>
);

export default ButtonsButton;
