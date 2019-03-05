/* global google */
import React, { Component } from 'react';

import { shallow, mount } from 'enzyme';
import { GoogleMap } from '../GoogleMap';
import { GoogleMapContext } from '../GoogleMapInitialzer';

class CWithMapAccess extends Component {
  static contextType = GoogleMapContext;
  render() {
    return <div>Access to map instance using GoogleMapContext</div>;
  }
}

describe('GoogleMap', () => {
  it('has not changed', () => {
    const props = {
      google,
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = shallow(<GoogleMap {...props}><div /></GoogleMap>);
    expect(wrapper).toMatchSnapshot();
  });

  it('provides map instance to children components', () => {
    const props = {
      google,
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = mount(<GoogleMap {...props}><CWithMapAccess /></GoogleMap>);
    const instance = wrapper.find(CWithMapAccess).instance();
    expect(instance.context.map).toBeInstanceOf(google.maps.Map);
  });
});
