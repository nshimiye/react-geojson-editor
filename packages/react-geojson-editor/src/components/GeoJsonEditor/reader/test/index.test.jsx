import React from 'react';

import { shallow } from 'enzyme';
import { GeoJsonReader } from '../GeoJsonReader';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonReader />);
    expect(wrapper).toMatchSnapshot();
  });
  xit('renders', () => {
    const wrapper = shallow(<GeoJsonReader />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
