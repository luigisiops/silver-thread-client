import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './App.css';


// Pages
import MaterialsTable from './data-tables/ui/MaterialsTable'
import SalesTable from './data-tables/ui/SalesTable'
import ProductsTable from './data-tables/ui/ProductsTable'
import Dashboard from './dashboard/ui/Dashboard'
import Login from './login/ui/login';
import Logout from './login/ui/logout';

import {UserSignout} from './login/use-cases/UserSignOut'


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
    [theme.breakpoints.down("sm")]: {
      justifyItems: 'center',
      fontSize: 10,
    },
  },
  label: {
    [theme.breakpoints.down("sm")]: {
      justifyItems: 'center',
      fontSize: 10,
    },
  },
  overrides: {
    MuiTabRoot: {
      [theme.breakpoints.down("sm")]: {
        justifyItems: 'center',
        fontSize: 10,
      },
      },
    },
  }))

const NavTabs = ({onUserSignOut})=> {
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
          <LinkTab label={<span className={classes.label}>Dashboard</span>} href="/dashboard" {...a11yProps(0)} />
          <LinkTab label={<span className={classes.label}>Materials</span>} href="/materials" {...a11yProps(1)} />
          <LinkTab label={<span className={classes.label}>Products</span>} href="/products" {...a11yProps(2)} />
          <LinkTab label={<span className={classes.label}>Sales</span>} href="/sales" {...a11yProps(3)} />
          <LinkTab label={<span className={classes.label}>Logout</span>} href="/" onClick = {()=>{onUserSignOut()}} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MaterialsTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductsTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SalesTable />
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  login: state.login.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  onUserSignOut: UserSignout(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs)
