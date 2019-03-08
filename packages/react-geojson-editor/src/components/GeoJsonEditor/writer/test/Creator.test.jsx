import React from 'react';

import { shallow, mount } from 'enzyme';
import { setMapMock, addListenerMock } from '../../../../../test/helpers/google';

import { GoogleMapContext } from '../../google-map';
import { Creator } from '../Creator';

describe('Button', () => {
  beforeEach(() => {
    setMapMock.mockClear();
    addListenerMock.mockClear();
  });

  it('has not changed', () => {
    const wrapper = shallow(<Creator />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders by creating drawingManager and attaching it to the map instance', () => {
    // Arrange
    const map = new google.maps.Map();

    // Act
    const wrapper = mount(
      <GoogleMapContext.Provider value={{ map, google }}>
        <Creator />
      </GoogleMapContext.Provider>
    ); 

    // Assert: that gmapData has been attached to the map instance
    expect(wrapper.instance().drawingManager.setMap).toHaveBeenCalledWith(map);
  });
});
