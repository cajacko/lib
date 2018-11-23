// @flow

import React from 'react';
import { Icon as UIIcon } from '../UI';

const withIcon = name => props => <UIIcon name={name} {...props} />;

export default withIcon;
