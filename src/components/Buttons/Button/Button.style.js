import styled from "styled-components";
import { COLORS } from "../../../config/buttons";

export const Button = styled.button`
  appearance: none;
  border: none;
  background-color: ${COLORS.DEFAULT.BACKGROUND};
  padding: 10px;
  min-width: 150px;
`;
