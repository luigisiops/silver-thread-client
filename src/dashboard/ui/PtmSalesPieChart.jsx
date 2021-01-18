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
  
const PtmSalesPieChart = ({getSales, ptmSales}) => {
  const [loaded, setLoaded] = useState(false)
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

    if (Object.keys(ptmSales).length > 0) {
      let data = []
      for (const category in ptmSales){
        //data[category] = products[category].length
        let field = { x: `${category}: ${ptmSales[category].length} `, y: ptmSales[category].length}
        data.push(field)
      }

      return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    Silverthread Designs PTM Sales vs Others (Past 90)
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
  ptmSales: state.sales.salesByPtm
})

const mapDispatchToProps = (dispatch) => ({
  getSales: GetSales(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PtmSalesPieChart)

  