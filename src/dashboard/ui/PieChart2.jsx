import React from 'react';
import { VictoryPie, VictoryChart, VictoryLegend, VictoryLabel , VictoryContainer, VictoryGroup} from 'victory';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
    root: {
        // display: "flex",
        // minHeight: 800,
        // minWidth: 400,
        // width: 500,
    //   minWidth: 275,
      backgroundColor: "white",
    //   justifyContent: "center"
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
    }
  });

  const data = [
    { x: "Necklaces", y: 35 },
    { x: "Bracelets", y: 40 },
    { x: "Earrings", y: 55 }
  ]

//   const data = [
//     { x: 1, y: 2 },
//     { x: 2, y: 2 },
//     { x: 3, y: 3 }
//   ];
//   const legendData = [{ name: "Necklaces" }, { name: "Bracelets" }, { name: "Rings" }];
  
const PieChart2 = () => {
    const classes = useStyles();

      return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    Silverthread Designs Sales Over Time
                    {/* be{bull}nev{bull}o{bull}lent */}
                </Typography>
                <VictoryPie
                data={data}
                // labels={({ legendData }) => data.y}
                // labelPosition={({ index }) => index
                //     ? "centroid"
                //     : "startAngle"
                // }
                />
          </CardContent>
        </Card>
      )
}

export default PieChart2

  