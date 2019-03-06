import React from 'react';

import { shallow } from 'enzyme';
import { GeoJsonReader } from '../GeoJsonReader';
import { PolygonDataContext } from '../../google-map';
import Reader from '../Reader';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<GeoJsonReader />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a consumer', () => {
    const wrapper = shallow(<GeoJsonReader />);
    expect(wrapper.find(PolygonDataContext.Consumer)).toHaveLength(1);
  });

  // TODO Assert: PolygonDataContext consumer is provided with correct gmapData and newPolygonList

});
