import React from 'react';

import { shallow, mount } from 'enzyme';
import { Reader } from '../Reader';
import google, { setMapMock } from '../../../../../test/helpers/google';
import { GoogleMapContext } from '../../google-map';

describe('Reader', () => {
  beforeEach(() => {
    setMapMock.mockClear();
  });

  it('has not changed', () => {
    const wrapper = shallow(<Reader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders by attaching the map data to the map instance', () => {    
    // Arrange
    const map = new google.maps.Map();

    // Act
    const wrapper = mount(
      <GoogleMapContext.Provider value={{ map }}>
        <Reader gmapData={new google.maps.Data()} />
      </GoogleMapContext.Provider>
    ); 

    // Assert: that gmapData has been attached to the map instance
    expect(wrapper.props().gmapData.setMap).toHaveBeenCalledWith(map);
  });

});
