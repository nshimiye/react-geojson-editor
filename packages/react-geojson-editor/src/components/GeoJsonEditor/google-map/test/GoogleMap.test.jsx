/* global google */
import React, { Component } from 'react';

import { shallow, mount } from 'enzyme';
import { GoogleMap, GoogleMapWithLoader } from '../GoogleMap';
import { GoogleMapContext } from '../GoogleMapInitialzer';

class YourComponent extends Component {
  static contextType = GoogleMapContext;
  componentDidMount() {
    if (this.context.map) {
      this.context.map.setCenter({ lat: 0, lng: 0 });
    }
  }
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
    const wrapper = mount(<GoogleMap {...props}><YourComponent /></GoogleMap>);
    const instance = wrapper.find(YourComponent).instance();
    expect(instance.context.map).toBeInstanceOf(google.maps.Map);
  });
});

describe('GoogleMapWithLoader', () => {
  it('has not changed', () => {
    const props = {
      googleMapURL: '',
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = shallow(<GoogleMapWithLoader {...props}><div /></GoogleMapWithLoader>);
    expect(wrapper).toMatchSnapshot();
  });

  it('provides map instance to child components', () => {
    const props = {
      googleMapURL: '',
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = mount(<GoogleMapWithLoader {...props}><YourComponent /></GoogleMapWithLoader>);
    const instance = wrapper.find(YourComponent).instance();
    expect(instance.context.map).toBeInstanceOf(google.maps.Map);
  });
});

