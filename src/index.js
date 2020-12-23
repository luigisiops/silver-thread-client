import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// import Login from './login/ui/login';


const theme = createMuiTheme({
  palette: {
     primary: {
       main: "#4db6ac"
      //  main: "#f06292" //pink
               },
     secondary: {
       main: "#f06292" //pink
        // main: "#01579b" //blue
        // main: "#d50000" //red
        // main: "f50057" //dark pink
                }
           },
// fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});


ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <Login /> */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
