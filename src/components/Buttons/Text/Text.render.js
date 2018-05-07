import React from "react";
import ButtonsButton from "../Button";
import Text from "../../Text/Text";
import { COLORS } from "../../../config/buttons";

const ButtonsText = ({ text, action }) => (
  <ButtonsButton action={action}>
    <Text text={text} color={COLORS.DEFAULT.TEXT} />
  </ButtonsButton>
);

export default ButtonsText;
