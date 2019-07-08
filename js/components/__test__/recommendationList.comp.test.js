/* global describe,it,expect */

import React from 'react';
import { shallowWithStore } from 'enzyme-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import RecommendationList from '../recommendationList.comp';
import PropTypes from 'prop-types';
import moment from 'moment';

// mock store
const mockStore = configureStore([]),
    minState = {
        nav: {}
    };

// required props
const minProps = {
    data: [{ id: 10, price: 20, recommendation: 'Buy', 
        symbol: 'APPL', date: moment(), socialCount: 66, provider: 'twitter'},
        { id: 11, price: 20, recommendation: 'Buy', 
        symbol: 'LMI', date: moment(), socialCount: 33, provider: 'facebook'}]
};

describe('<recommendationList>', () => {
    it('renders', () => {
        const store = mockStore(minState),
            wrapper = shallowWithStore(<RecommendationList {...minProps} />, store);
        expect(wrapper.find('.RecommendationList').length).toBe(1);
    });

    it('renders expected number of rows', () => {
        const store = mockStore(minState),
            wrapper = shallowWithStore(<RecommendationList {...minProps} />, store);
        expect(wrapper.find('.RecommendationList__recommendation').length).toBe(2);
    });
});
