/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './src/redux/store'

// redux saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/redux/sagas/rootSaga'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const Ecommerce = () => (
    <Provider store={ store }>
        <App />
    </Provider>
)

sagaMiddleware.run(rootSaga)

AppRegistry.registerComponent(appName, () => Ecommerce);
