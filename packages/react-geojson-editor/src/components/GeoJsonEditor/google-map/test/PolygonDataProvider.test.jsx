import React from 'react';

import { shallow } from 'enzyme';
import { GeoJsonController } from '../GeoJsonController';
import { Button } from '../../../Button';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonController />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', () => {
    const wrapper = shallow(<GeoJsonController />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
