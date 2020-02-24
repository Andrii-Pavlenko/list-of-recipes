import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {reducer} from "./redux/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose();

const middlewares = [thunk];

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);


ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));
