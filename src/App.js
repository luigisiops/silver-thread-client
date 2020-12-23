import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



// Pages
import MaterialsTable from './data-tables/ui/MaterialsTable'
import SalesTable from './data-tables/ui/SalesTable'
import ProductsTable from './data-tables/ui/ProductsTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Materials" href="/materials" {...a11yProps(0)} />
          <LinkTab label="Products" href="/products" {...a11yProps(1)} />
          <LinkTab label="Sales" href="/sales" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MaterialsTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductsTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <SalesTable />
      </TabPanel>
    </div>
  );
}




// import React from 'react';
// import './App.css';
// import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// // Pages
// import MaterialsTable from './data-tables/ui/MaterialsTable'
// import SalesTable from './data-tables/ui/SalesTable'
// import ProductsTable from './data-tables/ui/ProductsTable'


  // const routes = ["/materials", "/products", "/sales"]

  // return(
  //   <div className="App">
  //     <BrowserRouter>
  //     <Route path="/">
  //     <AppBar>
  //       <Tabs>
  //         <Tab label="Materials" value={routes[0]}/>
  //         <Tab label="Products" value={routes[1]}/>
  //         <Tab label="Sales" value={routes[2]}/>
  //       </Tabs>
  //     </AppBar>
  //     </Route>

  //     <Switch>
  //       <Route component={MaterialsTable} path='/materials' />
  //       <Route component={ProductsTable} path='/products'/>
  //       <Route component={SalesTable} path='/sales'/>
  //     </Switch>
  //     </BrowserRouter>
  //   </div>
  // )
// }
// const App = () => {
//   return (
//     <div className="App">
//       <h1>App</h1>
//     </div>
//   );
// }

// export default App;
