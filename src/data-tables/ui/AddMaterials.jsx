import TextField from "@material-ui/core/TextField"
import SaveIcon from "@material-ui/icons/Save"
import Button from "@material-ui/core/Button"
import { useState } from "react"
import { connect } from "react-redux"
import { AddMaterial } from "../use-cases/addMaterial"
import './AddSales.css'
import './EditSales.css'
import './AddMaterialModal.css'

const AddMaterials = ({ closeModal, onAddMaterial }) => {
    // putting empty fields object into local state
   const [fields, setFields] = useState({})

   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value,
      })

   return (
      <div className="addMaterialTBContainer">
         <h2>Add Material</h2>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Material Name"
               name="material_name"
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
               label="Unit"
               name="unit"
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
               label="Price Per Unit"
               name="unit_price"
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
               label="Material Category"
               name="category"
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
               label="Vendor"
               name="vendor"
               onChange={setField}
               InputLabelProps={{
                  shrink: true,
               }}
               variant="outlined"
            />
         </div>

         <div className="inputContainer">
            <TextField
               className="outlined"
               label="Product ID"
               name="vendor_material_id"
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
                  onAddMaterial(fields); closeModal()

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
      </div >
   )
}

// CRUD operation
const mapDispatchToProps = (dispatch) => ({
   onAddMaterial: AddMaterial(dispatch)
})

export default connect(null, mapDispatchToProps)(AddMaterials)
