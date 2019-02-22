/* eslint-disable */

import React, { Component, Children } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import classnames from 'classnames'; // eslint-disable-line import/no-extraneous-dependencies

// import OutsideClickHandler from 'react-outside-click-handler';
import DropdownStyles from './styles.scss';

export class Dropdown extends Component {
    state = {
      open: this.props.openAtStart,
    }
    constructor(props) {
      super(props);
      this.onBlurClose = this.onBlurClose.bind(this);
      this.toggleOpen = this.toggleOpen.bind(this);
      this.renderContent = this.renderContent.bind(this);
    }

    onBlurClose() {
      this.setState({ open: false });
    }

    toggleOpen(e) {
      e.preventDefault();
      const { children } = this.props;
      this.setState({ open: !this.state.open && Boolean(Children.count(children)) });
    }

    renderContent(children) {
      return (
        <div className={DropdownStyles.dropdownBody}>
          {children}
        </div>
      );
    }

    render() {
      const { open } = this.state;
      const {
        children, name, positionRight, style, containerStyle,
      } = this.props;
      return (
        <div
          className={
                positionRight ?
                    classnames(DropdownStyles.mlDropdown, DropdownStyles.rightPosition) :
                    DropdownStyles.mlDropdown
            }
          style={style}
        >
          <div className={DropdownStyles.dropdownContainer} style={containerStyle}>
            {/* <OutsideClickHandler onOutsideClick={this.onBlurClose}> */}
            <div
              className={open ?
                                classnames(DropdownStyles.dropdownButton, DropdownStyles.open) :
                                DropdownStyles.dropdownButton
                            }
              tabIndex="0"
              onClick={this.toggleOpen}
            >
              {name}
            </div>
            {open && this.renderContent(children)}
            {/* </OutsideClickHandler> */}
          </div>
        </div>
      );
    }
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  name: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
};

Dropdown.defaultProps = {
  name: 'Dropdown',
  style: {},
  containerStyle: {},
};

export default Dropdown;
