import TextField from "@material-ui/core/TextField"
// import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useState } from "react"
import { connect } from "react-redux"
import { AddProduct } from "../use-cases/addProduct"
import './AddSales.css'
import './EditSales.css'

const AddProducts = ({closeModal, onAddProduct}) => {
 // putting empty fields object into local state
 const [fields, setFields] = useState({})

 const setField = (evt) =>
    setFields({
       ...fields,
       [evt.target.name]: evt.target.value,
    })

 // refreshes the page when save button is clicked
 // let onClosePopup = () => {
 //    // console.log("onClosePopop")
 //    window.location.reload()
 // }

 return (
    <div className='editSalesContainer'>
       <h1>Add Products</h1>
       <Button onClick = {closeModal}>Close</Button>
       <div id="inputs">
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
             label="Product Number"
             name="product_number"
             onChange={setField}
             InputLabelProps={{
                shrink: true,
             }}
             variant="outlined"
          />
          <TextField
             className="outlined"
             label="Labor"
             name="labor"
             onChange={setField}
             InputLabelProps={{
                shrink: true,
             }}
             variant="outlined"
          />
          <TextField
             className="outlined"
             label="Wholesale"
             name="wholesale"
             onChange={setField}
             InputLabelProps={{
                shrink: true,
             }}
             variant="outlined"
          />
          <TextField
             className="outlined"
             label="Retail Price"
             name="retail_price"
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
             label="Category"
             name="category"
             onChange={setField}
             InputLabelProps={{
                shrink: true,
             }}
             variant="outlined"
              />

              <Button
                onClick={() => {
                  onAddProduct(fields)
         
                }}
                variant="contained"
                color="secondary"
                size="large"
                className="addSalesBtn"
                // startIcon={<SaveIcon />}
             >
                Save
             </Button>
       
       </div>
    </div>
 )
}

// CRUD operation 
const mapDispatchToProps = (dispatch) => ({
  onAddProduct: AddProduct(dispatch)
})

export default connect(null, mapDispatchToProps)(AddProducts)