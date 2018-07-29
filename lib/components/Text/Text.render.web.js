import React from 'react';

const Text = ({ text, ...props }) => <span {...props}>{text}</span>;

export default Text;
