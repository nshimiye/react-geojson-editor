import React, { Component, Children } from 'react';

import ButtonStyles from './styles.scss';

export const Button = ({ children, ...props }) => (
  <button
    className={ButtonStyles.button}
    {...props}
  >{children}
  </button>
);

export default Button;
