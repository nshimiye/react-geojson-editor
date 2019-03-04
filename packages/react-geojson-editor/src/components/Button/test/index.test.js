import React from 'react';

import { shallow } from 'enzyme';
import { Button } from '../component';

describe('Button', () => {
    it('has not changed', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot()
    })
    it('renders', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('handles click events', () => {
        const onButtonClick = jest.fn();
        const wrapper = shallow(<Button onClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick).toHaveBeenCalled();
    })
})
