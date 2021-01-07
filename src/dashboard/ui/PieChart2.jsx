import React, {useEffect, useState} from 'react';
import { connect } from "react-redux"
import { VictoryPie, VictoryChart, VictoryLegend, VictoryLabel , VictoryContainer, VictoryGroup} from 'victory';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';


import { GetProducts } from '../../data-tables/use-cases/getProducts'

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      backgroundColor: "white",
    },
  });

  const data = [
    { x: "Necklaces", y: 35 },
    { x: "Bracelets", y: 40 },
    { x: "Earrings", y: 55 }
  ]

  
const PieChart2 = ({getProducts, products}) => {
  const [loaded, setLoaded] = useState(false)

    
    const classes = useStyles();

    useEffect(() => {  
      getProducts()
    }, [])

    if (Object.keys(products).length>0) {
      let data = []
      for (const category in products){
        //data[category] = products[category].length
        let field = { x: `${category}: ${products[category].length} `, y: products[category].length}
        data.push(field)
      }
      console.log(data)
      return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    Silverthread Designs Products Sold by Category
                </Typography>
                <VictoryPie
                innerRadius={90}
                  data={data}
                  colorScale={["#78bfb5", "#f06292", "#b71c1c"]}
                  labelRadius={({ innerRadius }) => innerRadius + 17 }
                  style={{ labels: { fill: "black", fontWeight: "bold" } }}
                  labelPlacement={"parallel" && "vertical" }
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
  products: state.products.byCategories
})

const mapDispatchToProps = (dispatch) => ({
  getProducts: GetProducts(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PieChart2)

  