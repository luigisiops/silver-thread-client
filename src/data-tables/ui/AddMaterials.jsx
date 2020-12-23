import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AddMaterial } from "../use-cases/addMaterial"
import { Link } from "react-router-dom"
import './AddSales.css'

const AddMaterials = ({ onAddMaterial }) => {
    // putting empty fields object into local state
   const [fields, setFields] = useState({})
   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

   // refreshes the page when save button is clicked
   let onClosePopup = () => {
      // console.log("onClosePopop")
      window.location.reload()
   }

   return (
      <div id="container">
         <h1>Add Sales</h1>

         <div id="inputs">
            <TextField
               className="outlined"
               label="Material Name"
               name="material_name"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
             <TextField
               className="outlined"
               label="Unit"
               name="unit"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Price Per Unit"
               name="unit_price"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Material Category"
               name="category"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
            <TextField
               className="outlined"
               label="Vendor"
               name="vendor"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
                />
            <TextField
               className="outlined"
               label="Product ID"
               name="vendor_material_id"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
                />

                <Button
                  onClick={() => {
                    onAddMaterial(fields)
           
                  }}
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="addSalesBtn"
                  startIcon={<SaveIcon />}
               >
                  Save
               </Button>
         
         </div>
      </div>
   )
}

// CRUD operation 
const mapDispatchToProps = (dispatch) => ({
    onAddMaterial: AddMaterial(dispatch)
})

export default connect(null, mapDispatchToProps)(AddMaterials)
