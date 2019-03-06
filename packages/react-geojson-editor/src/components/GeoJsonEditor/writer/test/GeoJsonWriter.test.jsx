import React from 'react';

import { shallow } from 'enzyme';
import { GeoJsonWriter } from '../GeoJsonWriter';
import { PolygonDataContext } from '../../google-map';

describe('GeoJsonWriter', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonWriter />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders consumer', () => {
    const wrapper = shallow(<GeoJsonWriter />);
    expect(wrapper.find(PolygonDataContext.Consumer)).toHaveLength(1);
  });
});
