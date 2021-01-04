import './EditProduct.css'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { GetProductByID } from '../use-cases/getProductByID'
import { GetMaterials } from '../use-cases/getMaterials'
import { EditProductDetails } from '../use-cases/editProduct'
import { DeleteMaterialItem } from '../use-cases/deleteMaterialItem'
import { AddNewMaterial } from '../use-cases/addMaterialItem'
import { UpdateWholesale } from '../use-cases/editWholesale'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from "@material-ui/icons/Save"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';



//for material ui components
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


const EditProduct = ({ productData, onGetProductByID, productListing, onGetMaterials, materials, onEditProduct, onDeleteMaterialItem, materialDelete, onAddNewMaterial, newMaterialItem, onUpdateWholesale, closeEditModal, editProduct }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const [productDetails, setProductDetails] = useState({})
    const [newMaterial, setNewMaterial] = useState({ product_id: productData.id, material_unit_amount: '', })
    const [itemMaterialsList, setItemMaterialsList] = useState([])

    const steps = getSteps();

    useEffect(() => {
        let id = productData.id
        onGetProductByID(id)
        onGetMaterials()
    }, [materialDelete, newMaterialItem, editProduct])

    useEffect(() => {
        setProductDetails(productListing)

        if (productListing.MaterialByProdNums) {
            setItemMaterialsList(productListing.MaterialByProdNums)
        } else {
            setItemMaterialsList([])
        }
    }, [productListing])

    //handles changes to product listing from textboxes
    const handleOnChange = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        })
    }

    let materialItem = itemMaterialsList.map(item => {
        return <div className='materialItem' key={item.id}> {item.material_name}: {item.material_unit_amount} @ ${item.material_cost} each <IconButton onClick={() => onDeleteMaterialItem(item.id)} aria-label="delete"><DeleteIcon /></IconButton></div>
    })

    //these are the steps shown at the top of the stepper
    function getSteps() {
        return ['Edit Product Details', 'Edit Wholesale Price'];
    }

    function getStepContent(step) {

        switch (step) {
            case 0:
                return (
                    <div className="editProductContainer">
                        <div className='textInput'>
                            <TextField name='product_name' value={productDetails.product_name} onChange={handleOnChange} id="outlined-basic" label="Product Name" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                        <div className='textInput'>
                            <TextField name='product_num' value={productDetails.product_num} onChange={handleOnChange} id="outlined-basic" label="Product Number" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                        <div className='textInput'>
                            <TextField name='wholesale' value={productDetails.wholesale} onChange={handleOnChange} id="outlined-basic" label="Wholesale Price" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                        <div className='textInput'>
                            <TextField name='retail_price' value={productDetails.retail_price} onChange={handleOnChange} id="outlined-basic" label="Retail Price" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                        <div className='textInput'>
                            <TextField name='quantity' value={productDetails.quantity} onChange={handleOnChange} id="outlined-basic" label="Inventory (Home)" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                        <div className='textInput'>
                            <TextField name='quantity_painted_tree' value={productDetails.quantity_painted_tree} onChange={handleOnChange} id="outlined-basic" label="Inventory (PTM)" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </div>
                    </div>
                );

            //Input materials and quantity into MaterialsList   
            case 1:
                //STEP 2 -handles selection on material from selection picker
                const handleMaterialInput = (e) => {
                    let materialItem = e.target.value

                    let material = materials.find(item => {
                        return item.material_name == materialItem
                    })

                    setNewMaterial({
                        ...newMaterial,
                        material
                    })
                }

                //inputs quantity of materials
                const handleQuantityInput = (e) => {
                    setNewMaterial({
                        ...newMaterial,
                        [e.target.name]: e.target.value
                    })
                }

                return (
                    <div>
                        <div className='textInput'>
                            <div><h2>Edit Materials</h2>
                                <b>Current Materials List:</b>
                                {materialItem}
                            </div>
                            <b>Add New Material:</b>
                        </div>
                        <div className='textInput'>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={materials.map((option) => option.material_name)}
                                renderInput={(params) => (
                                    <TextField {...params} name='material' onSelect={handleMaterialInput} label="Select Material" margin="normal" variant="outlined" fullWidth />
                                )}
                            />
                        </div>
                        <div className='textField'>
                            <TextField name="material_unit_amount" value={newMaterial.material_unit_amount} onChange={handleQuantityInput} id="outlined-basic" label="Quantity" variant="outlined" fullWidth />
                        </div>
                        <div className='textInput'>
                            <Button variant="contained" color="primary" onClick={() => onAddNewMaterial(newMaterial)} className={classes.button} fullWidth >
                                Add Material
                            </Button>
                        </div>
                        <div className='laborContainer'>
                            <h2>Edit Labor</h2>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField name='labor' value={productDetails.labor} onChange={handleOnChange} id="outlined-basic" label="Labor (Minutes)" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                            </form>
                        </div>
                    </div>
                );
        }
    }
    // OnClick Functions For Stepper:

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = (product) => {
        onEditProduct(product)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleComplete = (product) => {
        onEditProduct(product)
        closeEditModal()
    };

    const handleWholesaleUpdate = (product) => {
        onUpdateWholesale(product)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
        <div className="addProductsContainer">
            <h2>Edit Product</h2>
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}

                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed. Your product is now live.
                                </Typography>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div>
                                    <Button disabled={activeStep === 0 || activeStep === 2} onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>

                                    {/* this button shows on the first step and takes the input for the product details */}
                                    {activeStep === 0 ? <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleNext(productDetails)}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                        : null}

                                    {activeStep === 0 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleComplete(productDetails)}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Save'}
                                        </Button>

                                        : null}

                                    {/* This button shows on the wholesale pricing step */}
                                    {activeStep === 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleWholesaleUpdate(productDetails)}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                        >
                                            {activeStep === steps.length - 1 ? 'Save' : 'Save'}
                                        </Button>
                                        : null}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state, { }) => ({
    productListing: state.products.productListing,
    materials: state.materials.materialsList,
    materialDelete: state.materialByProduct.materialItem,
    newMaterialItem: state.materialByProduct.newMaterial,
    editProduct: state.products.editedProduct
})

const mapDispatchToProps = (dispatch) => ({
    onGetProductByID: GetProductByID(dispatch),
    onGetMaterials: GetMaterials(dispatch),
    onEditProduct: EditProductDetails(dispatch),
    onDeleteMaterialItem: DeleteMaterialItem(dispatch),
    onAddNewMaterial: AddNewMaterial(dispatch),
    onUpdateWholesale: UpdateWholesale(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)