/* global expect */
import React from 'react';

expect.extend({
    toBeReactElement(received) {
        return {
            message: () => `expected ${received} to be a React element`,
            pass: React.isValidElement(received)
        };
    }
});

// checks if a given mock store includes any action with the given type
export function actionTypesInclude(store, actionType) {
    return actionsForType(store, actionType).length !== 0;
}

// returns all actions with a given action type
export function actionsForType(store, actionType) {
    return store.getActions()
        .filter(action => action.type === actionType);
}

// dives into an enzyme wrapper multiple times
export function multiDive(wrapper, diveCount) {
    let node = wrapper;
    for (let i = 0; i < diveCount; i += 1) {
        node = node.dive();
    }
    return node;
}

// dives down into a component with vertical scroll
export function unwrapVerticalScroll(wrapper, store) {
    const context = { context: { store } };
    return wrapper.shallow(context).dive().children().children().shallow(context);
}

// checks if a classname includes a specific class
export function classNameIncludes(classNames, className) {
    return classNames
        .split(' ')
        .includes(className);
}

// runs a block of `except`s after a timeout
export function expectDeferred(done, block, delay = 0) {
    setTimeout(() => {
        try {
            block();
            done();
        } catch (e) {
            done.fail(e.message);
        }
    }, delay);
}
