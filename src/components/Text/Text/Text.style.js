import styled from "styled-components";
import { FONT_FAMILY, FONT_SIZES, FONT_COLORS } from "../../../config/fonts";

const getColour = ({ color }) => {
  return FONT_COLORS[color] || FONT_COLORS.DEFAULT;
};

export const Span = styled.span`
  font-family: ${FONT_FAMILY.DEFAULT};
  font-size: ${FONT_SIZES.DEFAULT}px;
  color: ${getColour};
`;
