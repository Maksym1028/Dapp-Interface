/**
 * @license
 * Copyright @haytech. All Rights Reserved.
 *
 * Use of this source code is governed by MIT license.
 * https://haytech.ir
 */

import React from "react";
import ReactDOM from "react-dom";

import { MainScreen } from 'screens';
import { Provider } from "react-redux";
import configureStore from "store/store";

const { store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MainScreen />
    </Provider>,
    document.getElementById("root")
);
