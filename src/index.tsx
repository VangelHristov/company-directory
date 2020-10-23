import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { fetchEmployees } from './actions/employees/actions';
import { EmployeesActionTypes, EmployeesState } from './actions/employees/types';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<EmployeesState, EmployeesActionTypes>)));
store.dispatch(fetchEmployees());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
