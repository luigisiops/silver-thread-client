import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './AddProducts.css'

import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from "@material-ui/icons/Save"
import { GetMaterials } from "../use-cases/getMaterials"
import { AddProduct } from "../use-cases/addProduct"
import { GetProductByID } from '../use-cases/getProductByID'
import EditProductDetails from '../use-cases/editProduct';

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

const CopyProduct = ({ productData, productListing, onGetProductByID, onGetMaterials, materials, newReturnedProduct, onAddProduct, onAddRetail, }) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [newProduct, setNewProduct] = useState({ 'product_name': '', 'product_num': '', 'category': '', 'labor': '' })
    const [returnedProduct, setReturnedProduct] = useState({})
    const [materialToAdd, setMaterialToAdd] = useState({ 'material_unit_amount': '' })
    const [addedMaterialsList, setAddedMaterialsList] = useState([])

    const steps = getSteps();

    //gets materials for selector in add materials step on load
    //get product information to copy by original product id
    useEffect(() => {     
        let id = productData.id
        onGetProductByID(id)
        onGetMaterials()
    }, [])

    //sets product information including materials list
    useEffect(() => {
        setNewProduct(productListing)

        if (productListing.MaterialByProdNums) {
        setCopiedMaterialsList(productListing.MaterialByProdNums)
        }
 
    }, [productListing])

    //updates retail and inventory - step 3
    useEffect(() => {
  
        setReturnedProduct(newReturnedProduct)
        if (activeStep > 0) {
            setNewProduct({ 'product_name': '', 'product_num': '', 'category': '', 'labor': '' })
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [newReturnedProduct])


    const setCopiedMaterialsList = (copiedMaterials) => {

        let updatedArray = copiedMaterials.map(item => {
            return {
                material_id: item.material_id,
                material_name: item.material_name,
                unit_price: item.material_cost.toFixed(2),
                material_unit_amount: item.material_unit_amount,   
            }
        })
        setAddedMaterialsList(updatedArray)
    }


    //these are the steps shown at the top of the stepper
    function getSteps() {
        return ['Enter Product', 'Add Materials', 'Set Pricing'];
    }

    function getStepContent(step) {

        switch (step) {
            //Input product name, product number, categorgy, labor time
            case 0:
                //list of jewelry categories to choose from
                const category = [{ title: 'Earrings' }, { title: 'Necklaces' }, { title: 'Bracelets' }, { title: 'Rings' }, { title: 'Mezuzzahs' }, { title: 'Brooches' }, { title: 'Chains' }, { title: 'Other' }]

                //handles the input of the product name and number
                const handleProductInput = (e) => {
                    setNewProduct({
                        ...newProduct,
                        [e.target.name]: e.target.value
                    })
                }

                return (
                    <div className="productDetailContainer">

                        <h4>Enter Product Details</h4>
                        <div className="textField">
                            <TextField name="product_name" onChange={handleProductInput} value={newProduct.product_name} id="outlined-basic" label="Product Name" variant="outlined" fullWidth />
                        </div>
                        <div className="textField">
                            <TextField name="product_num" onChange={handleProductInput} value={newProduct.product_num} id="outlined-basic" label="Product Number" variant="outlined" fullWidth />
                        </div>
                        <div className="textField">                         
                             <TextField name="category" onChange={handleProductInput} value={newProduct.category} id="outlined-basic" label="Category" variant="outlined" fullWidth />
                        </div>
                        <div className="textField">
                            <TextField name="labor" onChange={handleProductInput} value={newProduct.labor} id="outlined-basic" label="Labor (minutes)" variant="outlined" fullWidth />
                        </div>
                    </div>
                );

            //Input materials and quantity into MaterialsList   
            case 1:
                //STEP 2 -gets the material details for the selected material from teh selector and adds
                //to materialToAdd - this is the step prior to adding to the material array
                const handleMaterialInput = (e) => {
                    let materialItem = e.target.value

                    let material = materials.find(item => {
                        return item.material_name == materialItem
                    })

                    //sets into material to add array
                    setMaterialToAdd({
                        ...materialToAdd,
                        material
                    })
                }

                //inputs quantity of materials into materialToAdd
                const handleQuantityInput = (e) => {
                    setMaterialToAdd({
                        ...materialToAdd,
                        [e.target.name]: e.target.value
                    })
                }

                //adds material in materialToAdd into the MaterialsArry
                const addToMaterialList = (addMaterial) => {

                    let material_unit_amount = +addMaterial.material_unit_amount

                    if (!addMaterial.material || addMaterial.material == '') {
                        alert('Please select a material')
                    } else if (isNaN(material_unit_amount) || material_unit_amount == '') {
                        alert('Please enter a quantity')
                    } else {
                        setAddedMaterialsList([...addedMaterialsList,
                        {
                            material_id: addMaterial.material.id,
                            material_name: addMaterial.material.material_name,
                            unit_price: addMaterial.material.unit_price.toFixed(2),
                            material_unit_amount: addMaterial.material_unit_amount,                            
                        }
                        ])

                        setMaterialToAdd({                        
                            material_unit_amount: ''
                        })
                    }
                }

                //allows user to delete added materials before saving to db
                const deleteMaterial = (id) => {
                    let updatedMaterialList = addedMaterialsList.filter(item => item.material_id != id)
                    setAddedMaterialsList(updatedMaterialList)
                }

                //map through materials in MaterialsList to show what has been added
                const displayMaterialList = addedMaterialsList.map(item => {                   
                    return <div key={item.material_id}>{item.material_name}: {item.material_unit_amount} @ ${item.unit_price} each <IconButton onClick={() => deleteMaterial(item.material_id)} aria-label="delete"><DeleteIcon /></IconButton></div>
                })


                return (
                    <div>
                        <div className='textField'>
                            <b>Select Materials:</b>
                        </div>
                        <div className='textField'>
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
                            <TextField name="material_unit_amount" value={materialToAdd.material_unit_amount} onChange={handleQuantityInput} id="outlined-basic" label="Quantity" variant="outlined" fullWidth />
                        </div>
                        <div className='textField'>
                            <Button onClick={() => addToMaterialList(materialToAdd)} variant="contained" color="primary" className={classes.button} >
                                Add Material
                            </Button>
                        </div>
                        {addedMaterialsList.length >= 1 ? <div className="addedMaterials">
                            <b>Added Materials: </b>
                            {displayMaterialList}
                        </div> : null}

                    </div>
                );


            // list all product details and add retail price and inventory    
            case 2:
                const handleSetPricing = (e) => {
                    setReturnedProduct({
                        ...returnedProduct,
                        [e.target.name]: e.target.value
                    })
                }

                return <div className="pricingContainer">
                    <h4>Set Pricing and Inventory</h4>
                    <label><b>Name:</b> {returnedProduct.product_name}</label>
                    <label><b>Product number:</b> {returnedProduct.product_num}</label>
                    <label><b>Category:</b> {returnedProduct.category}</label>
                    <label><b>Wholesale Price:</b> ${returnedProduct.wholesale.toFixed(2)}</label>
                    
                    <div className='pricingInputs'>
                        <h3>Add Retail Price:</h3>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField name='retail_price' onChange={handleSetPricing} id="outlined-basic" label="Retai Price" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </form>
                    </div>
                    <div className='pricingInputs'>
                        <h3>Add Inventory - Onsite:</h3>                    
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField name='quantity' onChange={handleSetPricing} id="outlined-basic" label="Inventory (Onsite)" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </form>
                    </div>
                    <div className='pricingInputs'>
                    <h3>Add Inventory - Painted Tree:</h3>                      
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField name='quantity_painted_tree' onChange={handleSetPricing} id="outlined-basic" label="Inventory (PTM)" variant="outlined" InputLabelProps={{ shrink: true, }} fullWidth />
                        </form>
                    
                    </div>
                </div>
            default:
                return 'Unknown step';
        }
    }

    // OnClick Functions For Stepper:

    //handles adding newProduct and materials to db from on click
    const addProductToDB = async (product, listMaterials) => {

        const addProduct = {
            product_name: product.product_name,
            product_num: product.product_num,
            product_id: product.product_id,
            category: product.category,
            labor: product.labor,
            materials: listMaterials
        }
        //call function here pass in addProduct
        onAddProduct(addProduct)
    }

    //from onclick in last step add retail price and inventory to the db
    const addRetailPriceToDB = async (finalProduct) => {

        //check to make sure retail price is currency        
        let retail = +finalProduct.retail_price

        //check to make sure inventory is a number
        let quantity = +finalProduct.quantity
        let quantity_painted_tree = +finalProduct.quantity_painted_tree

        if (!finalProduct.retail_price || isNaN(retail)) {
            alert('The retail price must be a number')
        } else if (!finalProduct.quantity || isNaN(quantity)) {
            alert('Inventory must be entered as a whole number')
        } else if (!finalProduct.quantity_painted_tree || isNaN(quantity_painted_tree)) {
            alert('Inventory must be entered as a whole number')        
        } else {
            onAddRetail(finalProduct)
            setReturnedProduct({})
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }


    //handle back, next and close handle the nav buttons at the bottom of the screen
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //takes user from entering details to enterin materials - check to make sure all fields are filled in
    const handleNext = () => {
        //check to make sure labor is a number
        let labor = +newProduct.labor

        if (newProduct.product_name == '') {
            alert('Please enter a product name')
        } else if (newProduct.category == '') {
            alert('Please enter a category')
        } else if (isNaN(labor) || newProduct.labor === '') {
            alert('Please enter the number of minutes required')
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    return (
        <div className="addProductsContainer">
            <h2>Copy Existing Product</h2>
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
                                    {activeStep === 0 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        : null}


                                    {/* This button shows on the second step and sends all product info to the db */}
                                    {activeStep === 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            //addProductsTODB - line 45
                                            onClick={() => addProductToDB(newProduct, addedMaterialsList)}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        : null}

                                    {/* This button shows on the final step and handles taking the input for retail pricing and inventory and sends to the db */}
                                    {activeStep === 2 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => addRetailPriceToDB(returnedProduct)}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                        >
                                            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
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

const mapStateToProps = (state, { materials }) => ({
    materials: state.materials.materialsList,
    newReturnedProduct: state.products.newProduct,
    productListing: state.products.productListing,
})

const mapDispatchToProps = (dispatch) => ({
    onGetMaterials: GetMaterials(dispatch),
    onGetProductByID: GetProductByID(dispatch),
    onAddProduct: AddProduct(dispatch),
    onAddRetail: EditProductDetails(dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(CopyProduct)