import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// Pages
import MaterialsTable from './ui/MaterialsTable'
import SalesTable from './ui/SalesTable'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route component={App} path='/' exact />
        <Route component={MaterialsTable} path='/materials' />
        <Route component={SalesTable} path='/sales'/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
