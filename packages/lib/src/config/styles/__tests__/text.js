import { COLORS_FOR_BACKGROUND, BACKGROUND_COLORS } from '../text';

describe('config/styles/text', () => {
  describe('we look at all the COLORS_FOR_BACKGROUND keys', () => {
    it('They all exist in BACKGROUND_COLORS', () => {
      Object.keys(COLORS_FOR_BACKGROUND).forEach((backgroundColor) => {
        if (!BACKGROUND_COLORS[backgroundColor]) {
          throw new Error(`${backgroundColor} does not exist in BACKGROUND_COLORS`);
        }
      });
    });
  });

  describe('we look at all the BACKGROUND_COLORS keys', () => {
    it('They all exist in COLORS_FOR_BACKGROUND', () => {
      Object.keys(BACKGROUND_COLORS).forEach((backgroundColor) => {
        if (!COLORS_FOR_BACKGROUND[backgroundColor]) {
          throw new Error(`${backgroundColor} does not exist in COLORS_FOR_BACKGROUND`);
        }
      });
    });
  });
});
