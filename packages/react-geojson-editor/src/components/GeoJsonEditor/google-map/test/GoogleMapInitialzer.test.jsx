import React from 'react';

import { shallow, mount } from 'enzyme';
import { GoogleMapInitialzer } from '../GoogleMapInitialzer';
import { ScriptContext } from '../ScriptLoader';

describe('Button', () => {
  it('has not changed', () => {
    const props = {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = shallow(<GoogleMapInitialzer {...props}><div /></GoogleMapInitialzer>);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders by creating a map', () => {
    const props = {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      height: 100,
      width: 100,
    };
    const wrapper = mount(
      <ScriptContext.Provider value={google}>
        <GoogleMapInitialzer {...props}><div /></GoogleMapInitialzer>
      </ScriptContext.Provider>
    );
    expect(wrapper.state().map).toBeDefined();
  });
});
