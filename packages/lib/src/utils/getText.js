// @flow

import marketingCopy from './marketingCopy';

export type TextValue = string | { _textFromConst: string };

/**
 * Get the text value to use. We only allow text that's in the marketing copy,
 * unless you pass in an object with the val at _textFromConst. This should
 * encourage you to only use text if it is specified in the marketing copy.
 * Anything from the server should use _textFromConst.
 */
const getText = (text: TextValue): string => {
  if (typeof text !== 'string' && typeof text._textFromConst === 'string') {
    return text._textFromConst;
  }

  return marketingCopy.get(text);
};

export default getText;
