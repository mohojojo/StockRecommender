/* global describe,it,expect,jest */

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header.comp';

describe('<Header>', () => {

    it('renders a <header> with class .Header', () => {
        const wrapper = shallow(<Header></Header>);
        expect(wrapper.find('.Header').length).toBe(1);
    });

    it('renders the title', () => {
        const wrapper = shallow(<Header></Header>);
        expect(wrapper.find('.Header__title').length).toBe(1);
    });
});
