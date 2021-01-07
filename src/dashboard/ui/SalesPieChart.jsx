import React, {useEffect, useState} from 'react';
import { connect } from "react-redux"
import { VictoryPie, VictoryChart, VictoryLegend, VictoryLabel , VictoryContainer, VictoryGroup} from 'victory';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';


import { GetSales } from '../../data-tables/use-cases/getSales'

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      backgroundColor: "white",
    },
    pos: {
      marginBottom: 12,
    },
  });

  const data = [
    { x: "Necklaces", y: 35 },
    { x: "Bracelets", y: 40 },
    { x: "Earrings", y: 55 }
  ]

  
const SalesPieChart = ({getSales, productSales}) => {
  const [loaded, setLoaded] = useState(false)
  const getStartDate = () => {
    let d = new Date()
    d.setDate(d.getDay()-90)
    return d
 }

 let end_date = new Date()
 let start_date = getStartDate()
 console.log(start_date)

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
        let field = { x: `${category}: ${productSales[category].length} `, y: productSales[category].length}
        data.push(field)
      }
      console.log(data)
      return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    Silverthread Designs Products Sales by Category (Past 90)
                </Typography>
                <VictoryPie
                  data={data}
                  colorScale={["#78bfb5", "#f06292", "#b71c1c"]}
                  labelRadius={({ innerRadius }) => innerRadius + 50 }
                  style={{ labels: { fill: "black", fontWeight: "bold" } }}
                />
          </CardContent>
        </Card>
      )
    }
    else{
      return (
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesPieChart)

  