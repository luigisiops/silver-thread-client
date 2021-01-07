import React, {useEffect} from 'react'
import { connect } from "react-redux"

import './Dashboard.css';
import { Container, AppBar, Typography, Grow, Grid, GridList } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


//Pages

import PieChart2 from './PieChart2'
import PtmSalesPieChart from './PtmSalesPieChart'
import SalesBarChart from './SalesBarChart'

import { CheckUser } from '../../login/use-cases/CheckUser' 

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "white",
      maxWidth: 500,
      minWidth: 300,
    },
    pos: {
      marginBottom: 12,
    },
    [theme.breakpoints.down('sm')]: {
      mainContainer: {
        flexDirection: 'column-reverse',
      },
    }
  }));

const Dashboard = ({getLoggedUser}) => {
    const classes = useStyles();
    const theme = useTheme();

  return (
    <Container maxWidth="xlg">
          <Container maxWidth="50%">
              <Grid container className={classes.mainContainer} justify="space-evenly" alignItems="stretch" spacing={3}>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <PtmSalesPieChart/>
                  </Grid>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <SalesBarChart/>
                  </Grid>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <PieChart2/>
                  </Grid>
              </Grid>
          </Container>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  user: state.login.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getLoggedUser: CheckUser(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)