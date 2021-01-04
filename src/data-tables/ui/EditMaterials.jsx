import { useState } from 'react'
import { connect } from 'react-redux' 
import { EditMaterial } from '../use-cases/editMaterial'
import './EditMaterial.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const EditMaterials = (props, {closeModal, onEditMaterial}) => {
    const classes = useStyles();

    const [updatedMaterialData, setUpdatedMaterialData] = useState(props.materialData)

    const handleOnChange = (e) => {
        setUpdatedMaterialData({
            ...updatedMaterialData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnClick = (data) => {
        props.onEditMaterial(data)
        props.closeEditModal()       
    }
 
    return (
        <div className='editSalesContainer'>
<<<<<<< HEAD
            <h1>Edit Materials</h1>
            <Button onClick = {closeModal}>Close</Button>
=======
            <h2>Edit Materials</h2>
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
            <div>                
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='material_name' value={updatedMaterialData.material_name} onChange={handleOnChange} id="outlined-basic" label="Material Name" variant="outlined" fullWidth/>
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='unit' value={updatedMaterialData.unit} onChange={handleOnChange} id="outlined-basic" label="Unit" variant="outlined" fullWidth/>
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='unit_price' value={updatedMaterialData.unit_price} onChange={handleOnChange} id="outlined-basic" label="Price Per Unit" variant="outlined" fullWidth/>
                </form>              
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='category' value={updatedMaterialData.category} onChange={handleOnChange} id="outlined-basic" label="Category" variant="outlined" fullWidth/>
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='vendor' value={updatedMaterialData.vendor} onChange={handleOnChange} id="outlined-basic" label="Vendor" variant="outlined" fullWidth/>
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='vendor_material_id' value={updatedMaterialData.vendor_material_id} onChange={handleOnChange} id="outlined-basic" label="Product ID" variant="outlined" fullWidth/>
                </form>
            </div>
            <div>        
                <Button onClick={() => handleOnClick(updatedMaterialData)} startIcon={<SaveIcon />} variant="contained" color="secondary" fullWidth>
                    Save
                </Button>                
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    onEditMaterial: EditMaterial(dispatch),
  })

export default connect(null, mapDispatchToProps)(EditMaterials)