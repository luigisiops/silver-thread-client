import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login/ui/login';
import Register from './login/ui/register';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./common/redux/store"
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
// import Login from './login/ui/login';
import './index.css';
import LeagueSparatanBoldWoff2 from './fonts/leaguespartan-bold-webfont.woff2'
import ForgotPassword from './login/ui/forgotPassword';

const league_spartanbold = {
  fontFamily: 'League Spartan',
  fontStyle: 'bold',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('League-Spartan'),
    local('League-Spartan-Bold'),
    url(${LeagueSparatanBoldWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};


const theme = createMuiTheme({
  palette: {
    background: {
      // paper: "#eeeeee"
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
      typography: {
        fontFamily: 'League-Spartan, Bold',
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [league_spartanbold],
          },
        },
      },
});


ReactDOM.render(
  <React.StrictMode>
  <Provider store = {store}>
  <CssBaseline />
    <Router>
      <ThemeProvider theme={theme}>
        <Route exact path = "/login">
          <Login />
        </Route>
        <Route exact path = "/register">
          <Register/>
        </Route>
        <Route path = "/password-reset/:userId/:token">
          <ForgotPassword />
        </Route>
        <Route exact path = "/">
          <App className="App"/>
        </Route>
      </ThemeProvider>
    </Router>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
