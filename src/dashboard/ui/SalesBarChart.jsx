import React, {useEffect, useState} from 'react'
import { connect } from "react-redux"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';

import { GetSales } from '../../data-tables/use-cases/getSales'



const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      minWidth: 275,
      backgroundColor: "white"
    },
    pos: {
      marginBottom: 12,
    },
  });


const SalesBarChart = ({productSales, getSales}) => {
  const getStartDate = () => {
    let d = new Date()
    d.setDate(d.getDay()-90)
    return d
 }

 let end_date = new Date()
 let start_date = getStartDate()

 const [selectedDate, setSelectedDate] = useState({
    start: start_date,
    end: end_date,
 })

    const classes = useStyles();
    useEffect(() => {  
      getSales(selectedDate)
    }, [])

    if (Object.keys(productSales).length > 0) {
      let data = []
      for (const category in productSales){
        //data[category] = products[category].length
        let field = { x: `${category} `, y: productSales[category].length}
        data.push(field)
      }
    return (
        <Card className={classes.root}>
        <CardContent>
        <Typography variant="h4" component="h2">
            Silverthread Designs Sales By Category (Last 90 Days)
          </Typography>
        <VictoryChart
        responsive={false}
        animate={{
          duration: 500,
          onLoad: { duration: 200 }
        }}
        domainPadding={{ x: 10 }}
        theme={VictoryTheme.material}
      >
      <VictoryAxis dependentAxis
        //  fixLabelOverlap 
        />
        <VictoryAxis 
         style={{tickLabels: { angle: 30 }}}
        //  fixLabelOverlap 
        />
        <VictoryBar
          barRatio={0.8}
          style={{ data: { fill: "#01579b" } }}
          data={data}
        />
      </VictoryChart>
        </CardContent>
      </Card>
    )
      }
      else{
        return(
          <div></div>
        )
      }
}
const mapStateToProps = (state) => ({
  productSales: state.sales.salesByCategories
})

const mapDispatchToProps = (dispatch) => ({
  getSales: GetSales(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesBarChart)

