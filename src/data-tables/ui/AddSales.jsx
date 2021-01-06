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
import Checkbox from '@material-ui/core/Checkbox'

const AddSales = ({ addSale, onGetProducts, products, closeAddModal }) => {
   // putting empty fields object into local state
   useEffect(() => {
      onGetProducts()
   }, [])

   const [checked, setChecked] = useState(false)
   const [fields, setFields] = useState({ 'tax': 8.25, 'date_sold': new Date(), 'shipping': 0, 'quantity': 0, 'discount': 0, 'sold_PTM': checked, 'sold_to': '' })


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

   const handleChange = (event) => {
      setChecked(event.target.checked);
      if (event.target.checked === true) {
         setFields({
            ...fields,
            'sold_PTM': true,
            'sold_to': 'Painted Tree Marketplace'
         })
      } else if (event.target.checked === false) {
         setFields({
            ...fields,
            'sold_PTM': false,
            'sold_to': ''
         })
      }

   };

   const handleSave = (fields) => {
      //check to make sure these fields are numbers
      let quantity = +fields.quantity
      let tax = +fields.tax
      let discount = +fields.discount
      let shipping = +fields.shipping

      if(!fields.productDetails) {
         alert("Please select a product")
      } else if (!quantity || isNaN(quantity)) {
         alert("Please enter a quantity sold")
      } else if (isNaN(tax)) {
         alert("Please enter a tax rate")
      } else if (!fields.sold_to || fields.sold_to == "") {
         alert("please enter the purchasers name")
      } else if (!fields.date_sold) {
         alert("Please enter the sales date")                 
      } else if (isNaN(discount)) {
         alert("Please enter the discount percentage")    
      } else if (isNaN(shipping)) {
         alert("Please enter the shipping cost")  
      } else {
         addSale(fields)
         closeAddModal()
      }    
   }

   return (
      <div className="addMaterialTBContainer">
         <h2>Add Sale</h2>

         <div className="inputContainer">
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
         <div>
            <label> Sold At Painted Tree MarketPlace
         <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
               /></label>
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

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Purchased By"
               name="sold_to"
               value={fields.sold_to}
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
                  handleSave(fields)
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
