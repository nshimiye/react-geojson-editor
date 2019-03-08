import React from 'react';

import { shallow, mount } from 'enzyme';
import { PolygonDataProvider } from '../PolygonDataProvider';

describe('Button', () => {
  it('has not changed', () => {
    const wrapper = shallow(<PolygonDataProvider><div /></PolygonDataProvider>);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders by initializing methods to manage polygon storage', () => {
    const wrapper = mount(<PolygonDataProvider><div /></PolygonDataProvider>);
    expect(wrapper.state().addNewPolygon).toBeInstanceOf(Function);
    expect(wrapper.state().selectPolygon).toBeInstanceOf(Function);
    expect(wrapper.state().unSelectPolygon).toBeInstanceOf(Function);
  });
  // @TODO explain why addNewPolygon function is added to the state object
});
