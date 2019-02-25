import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import OutsideClickHandler from 'react-outside-click-handler';
import DropdownStyles from './styles.scss';
import { StylesType } from '../../../../custom-types';

export function renderContent(children) {
  return (
    <div className={DropdownStyles.dropdownBody}>
      {children}
    </div>
  );
}

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.onBlurClose = this.onBlurClose.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    // this.renderContent = this.renderContent.bind(this);
  }
    state = {
      open: this.props.openAtStart,
    }

    onBlurClose() {
      this.setState({ open: false });
    }

    toggleOpen(e) {
      e.preventDefault();
      const { children } = this.props;
      this.setState({ open: !this.state.open && Boolean(Children.count(children)) });
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
            <button
              className={
                open ?
                  classnames(DropdownStyles.dropdownButton, DropdownStyles.open) :
                  DropdownStyles.dropdownButton
              }
              onClick={this.toggleOpen}
            >
              {name}
            </button>
            {open && renderContent(children)}
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
  style: StylesType,
  containerStyle: StylesType,
  positionRight: PropTypes.bool,
  openAtStart: PropTypes.bool,
};

Dropdown.defaultProps = {
  name: 'Dropdown',
  style: {},
  containerStyle: {},
  positionRight: false,
  openAtStart: false,
};

export default Dropdown;
