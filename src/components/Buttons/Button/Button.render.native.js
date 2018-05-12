import React from "react";
import { TouchableOpacity, View } from "react-native";

const ButtonsButton = ({ children, action }) => (
  <TouchableOpacity onPress={action}>
    <View>{children}</View>
  </TouchableOpacity>
);

export default ButtonsButton;
