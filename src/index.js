import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// Pages
import MaterialsTable from './ui/MaterialsTable'

ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
      <Switch>
        <Route component={App} path='/' exact />
        <Route component={MaterialsTable} path='/materials' />
      </Switch>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
