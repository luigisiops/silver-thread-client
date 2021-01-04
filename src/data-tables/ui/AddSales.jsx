import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { AddSale } from "../use-cases/addSale"
import { GetProducts } from '../use-cases/getProducts'
import "./AddMaterialModal.css"
import DateFnsUtils from "@date-io/date-fns"
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from "@material-ui/pickers"
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddSales = ({ addSale, onGetProducts, products, closeAddModal }) => {
   // putting empty fields object into local state
   useEffect(() => {
      onGetProducts()
   }, [])

   const [fields, setFields] = useState({ 'tax': 8.25, date_sold: new Date(), shipping: 0, quantity: 0, discount: 0 })

   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

   const handleDateChange = (date) => {
      setFields({
         ...fields,
         date_sold: date
      })
   };

   const getProductDetails = (e) => {
      let selected_product = e.target.value

      let productDetails = products.find(item => {
         return item.product_name == selected_product
      })

      setFields({
         ...fields,
         productDetails
      })
   }

   return (
      <div className="addMaterialTBContainer">
         <h2>Add Sale</h2>
         {/* <div className="inputContainer">
            <TextField
               className="outlined"
               label="Product Number"
               name="product_number"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div> */}

         <div className="inputContainer">
            {/* <TextField
               className="outlined"
               label="Product Name"
               name="product_name"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            /> */}

            {/* Selector for products */}
            <Autocomplete
               id="free-solo-demo"
               freeSolo
               options={products.map((option) => option.product_name)}
               renderInput={(params) => (
                  <TextField {...params} name='product_name' onSelect={getProductDetails} value="" label="Product" margin="normal" variant="outlined" fullWidth />
               )} handleProductInput
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Quantity"
               name="quantity"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         {/* <div className="inputContainer">
            <TextField
               className="outlined"
               label="Price per Unit"
               name="price_per_unit"               
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div> */}

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Discount"
               name="discount"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         {/* <div className="inputContainer">
            <TextField
               className="outlined"
               label="Total Sales Price"
               name="total_price"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div> */}

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Tax"
               name="tax"
               value={fields.tax}
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Shipping"
               name="shipping"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         {/* <div className="inputContainer">
            <TextField
               className="outlined"
               label="Category"
               name="product_category"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div> */}        

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Purchased By"
               name="sold_to"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div className="inputContainer">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                  margin="normal"
                  name="date_sold"
                  id="date-picker-dialog"
                  label="Date Sold"
                  format="MM/dd/yyyy"
                  value={fields.date_sold}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                     'aria-label': 'change date',
                  }}
                  fullWidth
               />
            </MuiPickersUtilsProvider>
         </div>

         <div>
            <Button
               onClick={() => {
                  console.log(fields)
                  addSale(fields)
                  closeAddModal()
               }}
               variant="contained"
               color="secondary"
               size="large"
               className="addSalesBtn"
               startIcon={<SaveIcon />}
               fullWidth
            >
               Save
            </Button>
         </div>
      </div>
   )
}

const mapStateToProps = (state) => ({
   products: state.products.productsList,
})

// CRUD operation
const mapDispatchToProps = (dispatch) => ({
   addSale: AddSale(dispatch),
   onGetProducts: GetProducts(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSales)
