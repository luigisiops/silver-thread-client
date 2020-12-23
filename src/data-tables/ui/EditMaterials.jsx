import { useState } from 'react'
import { connect } from 'react-redux' 
import { EditMaterial } from '../use-cases/editMaterial'
import './EditSales.css'
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

const EditMaterials = (props, {onEditMaterial}) => {
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
    }
 
    return (
        <div className='editSalesContainer'>
            <h1>Edit Materials</h1>
            <div>                
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='material_name' value={updatedMaterialData.material_name} onChange={handleOnChange} id="outlined-basic" label="Material Name" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='unit' value={updatedMaterialData.unit} onChange={handleOnChange} id="outlined-basic" label="Unit" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='unit_price' value={updatedMaterialData.unit_price} onChange={handleOnChange} id="outlined-basic" label="Price Per Unit" variant="outlined" />
                </form>              
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='category' value={updatedMaterialData.category} onChange={handleOnChange} id="outlined-basic" label="Category" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='vendor' value={updatedMaterialData.vendor} onChange={handleOnChange} id="outlined-basic" label="Vendor" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='vendor_material_id' value={updatedMaterialData.vendor_material_id} onChange={handleOnChange} id="outlined-basic" label="Product ID" variant="outlined" />
                </form>
            </div>
            <div>        
                <Button onClick={() => handleOnClick(updatedMaterialData)} fullWidth startIcon={<SaveIcon />} variant="contained" color="secondary">
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