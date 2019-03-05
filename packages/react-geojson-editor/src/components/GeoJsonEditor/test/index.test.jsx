import React from 'react';

import { shallow } from 'enzyme';
import { GeoJsonEditor } from '../component';
import { GeoJsonController } from '../controllers';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonEditor />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', () => {
    const wrapper = shallow(<GeoJsonEditor />);
    expect(wrapper.find(GeoJsonController)).toHaveLength(1);
  });
});
