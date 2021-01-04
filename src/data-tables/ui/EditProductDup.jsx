import './EditProduct.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { GetProductByID } from '../use-cases/getProductByID'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from "@material-ui/icons/Save"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const EditProduct = ({ productData, onGetProductByID, productListing }) => {
    const classes = useStyles();

    const [productDetails, setProductDetails] = useState({})
    const [materialsList, setMaterialsList] = useState([])
    const [openEditWholesale, setOpenEditWholesale] = useState(false)

    useEffect(() => {
        let id = productData.id
        onGetProductByID(id)
    }, [])


    useEffect(() => {
        setProductDetails(productListing)

        if (productListing.MaterialByProdNums) {
            setMaterialsList(productListing.MaterialByProdNums)
        } else {
            setMaterialsList([])
        }
    }, [productListing])

    const openEdit = () => {
        setOpenEditWholesale(true)
    }

    const handleOnChange = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        })

    }

    const deleteMaterialItem = (id) => {

    }


    let materialItem = materialsList.map(item => {
        return <li key={item.id}> {item.material_name} - {item.material_unit_amount} - {item.material_cost} <IconButton onClick={() => deleteMaterialItem(item.id)} aria-label="delete"><DeleteIcon /></IconButton></li>
    })


    return (
        <div className="editProductContainer">
            {!openEditWholesale ? <div>
            <h2> Edit Product</h2>            
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_name' value={productDetails.product_name} onChange={handleOnChange} id="outlined-basic" label="Product Name" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='product_num' value={productDetails.product_num} onChange={handleOnChange} id="outlined-basic" label="Product Number" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='wholesale' value={productDetails.wholesale} onChange={handleOnChange} id="outlined-basic" label="Wholesale Price" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                <button onClick={() => setOpenEditWholesale(true)}>Edit Wholesale Price</button>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='retail_price' value={productDetails.retail_price} id="outlined-basic" label="Retail Price" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='quantity' value={productDetails.quantity} onChange={handleOnChange} id="outlined-basic" label="Inventory (Home)" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='quantity_painted_tree' value={productDetails.quantity_painted_tree} onChange={handleOnChange} id="outlined-basic" label="Inventory (PTM)" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form> </div> : null}
            {openEditWholesale ? <div><h2>Edit Wholesale Pricing</h2>
                <label>Labor:</label>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField name='labor' value={productDetails.labor} onChange={handleOnChange} id="outlined-basic" label="Labor (Minutes)" variant="outlined" InputLabelProps={{ shrink: true, }} />
                </form>
                    <label>Materials:</label>
                    {/*  */}
                
                {materialItem}
                <button onClick={() => setOpenEditWholesale(false)}>Save</button>
            </div> : null}

        </div>
    )

}

const mapStateToProps = (state, { }) => ({
    productListing: state.products.productListing

})

const mapDispatchToProps = (dispatch) => ({
    onGetProductByID: GetProductByID(dispatch)

})



export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)