import React from "react";
import ButtonsButton from "../Button";

const ButtonsText = ({ text, action }) => (
  <ButtonsButton action={action}>{text}</ButtonsButton>
);

export default ButtonsText;
