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
  });


const SalesBarChart = ({productSales, getSales}) => {
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
    // const bull = <span className={classes.bullet}>•</span>;
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
            {/* be{bull}nev{bull}o{bull}lent */}
          </Typography>
        <VictoryChart
        responsive={false}
        animate={{
          duration: 500,
          onLoad: { duration: 200 }
        }}
        domainPadding={{ x: 15 }}
        theme={VictoryTheme.material}
      >
     
        <VictoryBar
          barRatio={0.8}
          style={{ data: { fill: "#01579b" } }}
          data={data}
        />
      </VictoryChart>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
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

