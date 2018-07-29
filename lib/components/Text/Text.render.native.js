import React from 'react';
import { Text as NBText } from 'native-base';

const Text = ({ text, ...props }) => <NBText {...props}>{text}</NBText>;

export default Text;
