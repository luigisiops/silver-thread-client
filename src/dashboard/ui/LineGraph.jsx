import React from 'react'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
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
    // [theme.breakpoints.down('sm')]: {
    //   mainContainer: {
    //     flexDirection: 'column-reverse',
    //   },
    //   heading: {
    //     fontSize: '40px',
    //   }
    // }
  });

const LineGraph = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardContent>
        <Typography variant="h4" component="h2">
                    Silverthread Designs Sales
        </Typography>
        <VictoryChart
        theme={VictoryTheme.material}
        >
        <VictoryLine
            style={{
            data: { stroke: "#b71c1c" },
            parent: { border: "1px solid #ccc"}
            }}
            data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
            ]}
        />
        </VictoryChart>
        </CardContent>
        </Card>
    )
}

export default LineGraph
