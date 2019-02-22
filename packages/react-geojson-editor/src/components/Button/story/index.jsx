import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies

import Dropdown from '../component';

/**
 * Storybook for Dropdown
 */
export default (storiesOf, module, ContainerDecorator) => {
  storiesOf('Dropdown', module)
    .addDecorator(ContainerDecorator)
    .add('with required props', () =>
      (
        <Dropdown name="Customize View" >
          <div style={{ padding: 0, height: 250 }}> Child Component </div>
        </Dropdown>
      ))
    .add('with right positioning prop', () =>
      (
        <Dropdown name="Customize View" positionRight>
          <div style={{ padding: 20, height: 250 }}> Child Component </div>
        </Dropdown>
      ))
    .add('with default props', () => <Dropdown />);
};
