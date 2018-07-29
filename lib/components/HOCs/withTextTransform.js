import React from 'react';

const transformText = (text, { uppercase }) => {
  let transformedText = text;

  if (uppercase) transformedText = transformedText.toUpperCase();

  return transformedText;
};

const withTextTransform = Component => ({ text, uppercase, ...props }) => (
  <Component text={transformText(text, { uppercase })} {...props} />
);

export default withTextTransform;
