import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

import ButtonStyles from './styles.scss';

export const Button = ({ children, ...props }) => (
  <button
    className={ButtonStyles.button}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
};

Button.defaultProps = {
  children: 'Button',
};

export default Button;
