import React from "react";
import { Button } from "./Button.style";

const ButtonsButton = ({ children, action }) => (
  <Button onClick={action}>{children}</Button>
);

export default ButtonsButton;
