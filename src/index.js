import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App';

const middleware =
  process.env.NODE_ENV !== 'production'
    ? [require('redux-immutable-state-invariant').default(), reduxThunk]
    : [reduxThunk];

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
