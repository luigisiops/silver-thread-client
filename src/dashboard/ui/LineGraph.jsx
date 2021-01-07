import React from 'react'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      backgroundColor: "white",
      maxWidth: 500,
      minWidth: 300,
    },
    pos: {
      marginBottom: 12,
    },
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
