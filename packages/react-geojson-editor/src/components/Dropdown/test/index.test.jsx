import React from 'react';

import { shallow } from 'enzyme';
import { Dropdown } from '../component';

describe('Dropdown', () => {
  it('has not changed', () => {
    const wrapper = shallow(<Dropdown> <div className="dropdown-content"> HI </div></Dropdown>);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', () => {
    const wrapper = shallow(<Dropdown> <div className="dropdown-content"> HI </div></Dropdown>);
    expect(wrapper.find('.toggle-button')).toHaveLength(1);
  });

  it('opens', () => {
    const wrapper = shallow(<Dropdown> <div className="dropdown-content"> HI </div></Dropdown>);
    wrapper.find('.toggle-button').simulate('click', { preventDefault: () => undefined });
    expect(wrapper.find('.dropdown-content')).toHaveLength(1);
  });

  it('closes', () => {
    const wrapper = shallow(<Dropdown> <div className="dropdown-content"> HI </div></Dropdown>);
    wrapper.find('.toggle-button').simulate('click', { preventDefault: () => undefined });
    wrapper.find('.toggle-button').simulate('click', { preventDefault: () => undefined });
    expect(wrapper.find('.dropdown-content')).toHaveLength(0);
  });
});
