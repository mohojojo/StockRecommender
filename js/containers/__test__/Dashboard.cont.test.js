/* global describe,it,expect */

import React from 'react';
import { shallowWithStore } from 'enzyme-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Dashboard from '../Dashboard.cont';

// mock store
const mockStore = configureStore([thunk]),
    minState = {

    };

jest.mock('../../common/fetchHelper', () => {
    return {
        isFetched: () => true,
        getFetchResult: (state, desc) => {
            if (desc.id === 'stockhistory') {
                return {
                    data: []
                };
            }
            return {};
        },
        getFetchMeta: () => ({ isFetched: false })
    };
});

describe('<Dashboard>', () => {
    it('renders', () => {
        const store = mockStore(minState),
            wrapper = shallowWithStore(<Dashboard />, store);

        expect(wrapper.dive().find('.Dashboard').length).toBe(1);
    });
});
