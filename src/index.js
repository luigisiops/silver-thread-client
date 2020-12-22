import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Pages
import MaterialsTable from './data-tables/ui/MaterialsTable'
import SalesTable from './data-tables/ui/SalesTable'

ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
      <Switch>
        <Route component={App} path='/' exact />
        <Route component={MaterialsTable} path='/materials' />
        <Route component={SalesTable} path='/sales'/>
      </Switch>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
