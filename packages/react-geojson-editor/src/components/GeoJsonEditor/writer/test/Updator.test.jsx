import React from 'react';

import { shallow, mount } from 'enzyme';
import { setMapMock, addListenerMock } from '../../../../../test/helpers/google';

import { GoogleMapContext } from '../../google-map';
import { Updator } from '../Updator';

describe('Button', () => {
  beforeEach(() => {
    setMapMock.mockClear();
    addListenerMock.mockClear();
  });

  it('has not changed', () => {
    const wrapper = shallow(<Updator />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders by attaching each polygon to the map instance', () => {
    // Arrange
    const map = new google.maps.Map();
    const polygon = new google.maps.Polygon();
    const polygons = [new google.maps.Polygon(), polygon];

    // Act
    mount(
      <GoogleMapContext.Provider value={{ map, google }}>
        <Updator polygons={polygons} />
      </GoogleMapContext.Provider>
    ); 

    // Assert: that gmapData has been attached to the map instance
    expect(polygon.setMap).toHaveBeenCalledWith(map);
  });
});
