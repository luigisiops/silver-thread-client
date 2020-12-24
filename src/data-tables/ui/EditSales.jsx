import { useState } from 'react'
import { connect } from 'react-redux' 
import { EditSale } from '../use-cases/editSale'
import './EditSales.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
// import SaveIcon from "@material-ui/icons/Save"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const EditSales = (props, {onEditSale}) => {
    const classes = useStyles();

    const [updatedSalesData, setUpdatedSalesData] = useState(props.saleData)

    const handleOnChange = (e) => {
        setUpdatedSalesData({
            ...updatedSalesData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (date) => {
        setUpdatedSalesData({
            ...updatedSalesData,
            createdAt: date
        })
    };

    const handleOnClick = (data) => {
        props.onEditSale(data)       
    }
 
    return (
        <div className='editSalesContainer'>
            <h1>Edit Sale</h1>
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_number' value={updatedSalesData.product_number} onChange={handleOnChange} id="outlined-basic" label="Product Number" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_name' value={updatedSalesData.product_name} onChange={handleOnChange} id="outlined-basic" label="Product Name" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='quantity' value={updatedSalesData.quantity} onChange={handleOnChange} id="outlined-basic" label="Quantity" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='price_per_unit' value={updatedSalesData.price_per_unit} onChange={handleOnChange} id="outlined-basic" label="Price Per Unit" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='total_price' value={updatedSalesData.total_price} onChange={handleOnChange} id="outlined-basic" label="Total Sales Price" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_category' value={updatedSalesData.product_category} onChange={handleOnChange} id="outlined-basic" label="Category" variant="outlined" />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='sold_to' value={updatedSalesData.sold_to} onChange={handleOnChange} id="outlined-basic" label="Sold To" variant="outlined" />
                </form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        name="createdAt"
                        id="date-picker-dialog"
                        label="Sales Date"
                        format="MM/dd/yyyy"
                        value={updatedSalesData.createdAt}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div>        
                <Button onClick={() => handleOnClick(updatedSalesData)} /*fullWidth startIcon={<SaveIcon />}*/ variant="contained" color="secondary">
                    Save
                </Button>
                
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    onEditSale: EditSale(dispatch),
    
  })
export default connect(null, mapDispatchToProps)(EditSales)