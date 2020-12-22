import { useState } from 'react'
import './EditSale.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const EditSales = (props) => {
    const classes = useStyles();

    const [updatedSalesData, setUpdatedSalesData] = useState(props.saleData)

    const handleOnChange = (e) => {
        setUpdatedSalesData({...updatedSalesData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        //send updates to db
    }

    //have to pull products list
    const products = [{'title': 'earrings', 'product_number': '123'}, {'title': 'necklace', 'product_number': '345'}]

    return (
        <div className='editSalesContainer'>
            <h1>Edit Sales</h1>
            <div style={{ width: 300 }}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={products.map((option) => option.title )}        
                    renderInput={(params) => (
                        <TextField {...params} label="Product Name" margin="normal" variant="outlined" />
                    )}
                />
            </div>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField name='quantity' value={updatedSalesData.quantity} onChange={handleOnChange} id="outlined-basic" label="Quantity" variant="outlined" />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField name='price_per_unit' value={updatedSalesData.price_per_unit} onChange={handleOnChange} id="outlined-basic" label="Price Per Unit" variant="outlined" />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField name='total_price' value={updatedSalesData.total_price} onChange={handleOnChange} id="outlined-basic" label="Total Sales Cost" variant="outlined" />
            </form>
            <div style={{ width: 300 }}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={products.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField {...params} label="Category" margin="normal" variant="outlined" />
                    )}
                />
            </div>
        
            <form className={classes.root} noValidate autoComplete="off">
            <TextField name='sold_to' value={updatedSalesData.sold_to} onChange={handleOnChange} id="outlined-basic" label="Sold To" variant="outlined" />    
            </form>

            <button onClick={handleSubmit}>Submit</button>  

        </div>
    )
}

export default EditSales