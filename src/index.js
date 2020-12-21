import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Pages
<<<<<<< HEAD
import MaterialsTable from './data-tables/ui/MaterialsTable'
=======
import MaterialsTable from './ui/MaterialsTable'
import SalesTable from './ui/SalesTable'
>>>>>>> sales-table

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
