import React from 'react';

import { shallow } from 'enzyme';
import { Button } from '../../../Button';
import { GeoJsonWriter } from '../GeoJsonWriter';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonWriter />);
    expect(wrapper).toMatchSnapshot();
  });
  xit('renders', () => {
    const wrapper = shallow(<GeoJsonWriter />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
