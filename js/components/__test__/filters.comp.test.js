/* global describe,it,expect,jest */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Filters from '../filters.comp';

describe('<Filters>', () => {

    it('renders a <Filter> with `.Filters` class', () => {
        const wrapper = shallow(<Filters></Filters>);
        expect(wrapper.find('.Filters').length).toBe(1);
    });

    it('calls handleSubmit when clicked', () => {
        const onSearch = jest.fn(),
            wrapper = shallow(<Filters search={onSearch}></Filters>);
        wrapper.find('form').simulate('submit', { preventDefault () {} });
        expect(onSearch.mock.calls.length).toBe(1);
    });

    it('handles provider changed', () => {
        const onSearch = jest.fn(),
            wrapper = shallow(<Filters search={onSearch}></Filters>);
        wrapper.find('.Filters__provider').simulate('change', { target: { value: 'facebook' } });
        expect(wrapper.state().provider).toBe('facebook');
    });

    it('handles timewindow changed', () => {
        const onSearch = jest.fn(),
            wrapper = shallow(<Filters search={onSearch}></Filters>);
        wrapper.find('.Filters__timewindow').simulate('change', { target: { value: '20' } });
        expect(wrapper.state().timeWindow).toBe('20');
    });

    it('handles symbol changed', () => {
        const onSearch = jest.fn(),
            wrapper = shallow(<Filters search={onSearch}></Filters>);
        wrapper.find('.Filters__symbol').simulate('change', { target: { value: 'APPL' } });
        expect(wrapper.state().symbol).toBe('APPL');
    });
});
