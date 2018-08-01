// @flow

import React from 'react';
import { Icon as UIIcon } from '../UI';

const icons = {
  question: {
    name: 'arrow-back',
  },
};

const getIcon = icon => icons[icon] || icons.question;

const Icon = ({ icon }) => <UIIcon {...getIcon(icon)} />;

export default Icon;
