import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useState } from "react"
import { connect } from "react-redux"
import { AddSale } from "../use-cases/addSale"
import "./AddMaterialModal.css"

const AddSales = ({ addSale, closeAddModal }) => {
   // putting empty fields object into local state
   const [fields, setFields] = useState({})

   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

   return (
      <div className="addMaterialTBContainer">
         <h2>Add Sale</h2>

         {/*  need to add date */}

         <div className="inputContainer">
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
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Product Name"
               name="product_name"
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
               label="Price per Unit"
               name="price_per_unit"
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
               label="Total Sales Price"
               name="total_price"
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
               value="8.25"
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
               label="Category"
               name="product_category"
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
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
               fullWidth
            />
         </div>

         <div>
            <Button
               onClick={() => {
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

// CRUD operation
const mapDispatchToProps = (dispatch) => ({
   addSale: AddSale(dispatch),
})

export default connect(null, mapDispatchToProps)(AddSales)
