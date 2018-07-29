import React from 'react';
import { Text as NBText } from './Text.style';

const Text = ({ text, ...props }) => <NBText {...props}>{text}</NBText>;

export default Text;
