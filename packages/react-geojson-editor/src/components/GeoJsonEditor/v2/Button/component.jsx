import React from 'react';
import PropTypes from 'prop-types';

import ButtonStyles from './styles.scss';

export const Button = ({ children, ...props }) => (
  <button
    className={ButtonStyles.button}
    {...props}
  >{children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
