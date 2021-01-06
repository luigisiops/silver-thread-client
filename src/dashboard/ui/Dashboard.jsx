import React from 'react'
import './Dashboard.css';
import { Container, AppBar, Typography, Grow, Grid, GridList } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


//Pages
import PieChart from './PieChart'
import BarChart from './BarChart'
import BarChart2 from './BarChart2'
import PieChart2 from './PieChart2'
import LineGraph from './LineGraph';
import SalesPieChart from './SalesPieChart'
import PtmSalesPieChart from './PtmSalesPieChart'
import SalesBarChart from './SalesBarChart'


const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        // minHeight: 800,
        // minWidth: 400,
        // width: 500,
    //   minWidth: 275,
      backgroundColor: "white",
    //   justifyContent: "center"
    maxWidth: 500,
    minWidth: 300,
    },
    // bullet: {
    //   display: 'inline-block',
    //   margin: '0 2px',
    //   transform: 'scale(0.8)',
    // },
    // title: {
    //   fontSize: 14,
    // },
    pos: {
      marginBottom: 12,
    },
    pita: {
        // display: "flex",
        // marginLeft: 35,
        // margin: (0, 'auto'),
    },
    [theme.breakpoints.down('sm')]: {
      mainContainer: {
        flexDirection: 'column-reverse',
      },
    //   heading: {
    //     fontSize: '40px',
    //   }
    }
  }));

const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();

  return (
    <Container maxWidth="xlg">
          <Container maxWidth="50%">
              <Grid container className={classes.mainContainer} justify="space-evenly" alignItems="stretch" spacing={3}>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <BarChart2/>
                  </Grid>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <PieChart2/>
                  </Grid>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <SalesBarChart/>
                  </Grid>
                  <Grid container item xs={12} sm={5} lg={20}>
                      <PtmSalesPieChart/>
                  </Grid>
              </Grid>
          </Container>
    </Container>
  )
}

export default Dashboard