import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login/ui/login';
import Register from './login/ui/register';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// import Login from './login/ui/login';
import './index.css';



const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#eeeeee"
      // paper: "#bdbdbd"
      // paper: "#616161" // gray
    },
     primary: {
      //  main: "#4db6ac" //turquoise
       main: "#78bfb5", //other turquoise
       contrastText: "#FFFFFF"
      //  main: "#f06292" //pink
               },
     secondary: {
       main: "#f06292" //pink
        // main: "#01579b" //blue
        // main: "#b71c1c" //red
        // main: "#f50057" //dark pink
                },
           },
// fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});


ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
    <Router>
      <ThemeProvider theme={theme}>
<<<<<<< HEAD
        <Route exact path = "/">
          <Login />
        </Route>
        <Route exact path = "/register">
          <Register/>
        </Route>
=======
        {/* <Login /> */}
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
        <App className="App" />
      </ThemeProvider>
    </Router>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
