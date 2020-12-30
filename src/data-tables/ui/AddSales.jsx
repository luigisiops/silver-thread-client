import TextField from "@material-ui/core/TextField"
// import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AddSale } from "../use-cases/addSale"
import { Link } from "react-router-dom"
import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './AddSales.css'

const AddSales = ({ addSale }) => {
    // putting empty fields object into local state
   const [fields, setFields] = useState({})
   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

      // not sure if we need this but putting it in here anyway
   useEffect(() => {}, [])

   // refreshes the page when save button is clicked
   let onClosePopup = () => {
      // console.log("onClosePopop")
      window.location.reload()
   }
   const handleSaleDate = (date) => {
      setFields({
          ...fields,
          date_sold: date
      })
  };

   return (
      <div id="container">
         <h1>Add Sales</h1>

         <div id="inputs">
            <TextField
               className="outlined"
               label="Product ID"
               name="product_number"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Product Name"
               name="product_name"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Product Category"
               name="product_category"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Price Per Unit"
               name="price_per_unit"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Quantity"
               name="quantity"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Total Price"
               name="total_price"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Sold To"
               name="sold_to"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        name="date_sold"
                        id="date-picker-dialog"
                        label="Date of Sale"
                        format="MM/dd/yyyy"
                        value={fields.date_sold}
                        onChange={handleSaleDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
            <Link to="/sales">
               <Button
                  onClick={() => {
                     addSale(fields)
                     onClosePopup()
                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                  className="addSalesBtn"
                  // startIcon={<SaveIcon />}
               >
                  Save
               </Button>
            </Link>
         </div>
      </div>
   )
}

// CRUD operation 
const mapDispatchToProps = (dispatch) => ({
   addSale: AddSale(dispatch),
})

export default connect(null, mapDispatchToProps)(AddSales)
