/**
 * @license
 * Copyright @haytech. All Rights Reserved.
 *
 * Use of this source code is governed by MIT license.
 * https://haytech.ir
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './config/rootReducer';
import rootSaga from './config/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export type CoreStore = ReturnType<typeof rootReducer>;

const middlewareStack = [sagaMiddleware];

export default (initialState?: object) => {
    const store = createStore(rootReducer, initialState, applyMiddleware(...middlewareStack));

    return {
        store,
        runSaga: sagaMiddleware.run(rootSaga),
    };
};
