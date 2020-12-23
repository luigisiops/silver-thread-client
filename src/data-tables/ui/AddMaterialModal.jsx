import React, {useState} from "react"
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'

import "./AddMaterialModal.css"
import AddSales from "./AddSales";

const AddMaterialModal = ({sales, }) => {
    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }
    console.log(fields)

    return(
        <div className = "add-material-container">
            <div>Add Material</div>
            <div className="material-input"><TextField id="outlined-basic" label="Name" variant="outlined" name = "materialName" onChange = {setField}/></div> 
            <div className="material-input"><TextField id="outlined-basic" label="Vendor" variant="outlined" name = "vendor" onChange = {setField}/></div> 
            <div className="material-input"><TextField id="outlined-basic" label="Vendor Material Id" variant="outlined" name = "vendorMaterialId" onChange = {setField}/></div> 
            <div className="material-input"><TextField id="outlined-basic" label="Unit" variant="outlined" name = "unit" onChange = {setField}/></div> 
            <div className="material-input"><TextField id="outlined-basic" label="Unit Price" variant="outlined" name = "unitPrice" onChange = {setField}/></div> 
            <div className="material-input"><TextField id="outlined-basic" label="Category" variant="outlined" name = "category" onChange = {setField}/></div> 

        </div>
     
    )
}

const mapStateToProps = (state, { }) => ({
    sales: state.sales.salesList
})

const mapDispatchToProps = (dispatch) => ({
    onAddSales: AddSales(dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterialModal)