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
import { GetMaterials } from "../use-cases/getMaterials"
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from "@material-ui/icons/Save"

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

const AddProducts = ({ onGetMaterials, materials }) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [newProduct, setNewProduct] = useState({ 'product_name': '', 'product_number': '', 'category': '', 'labor': '' })
    const [returnedProduct, setReturnedProduct] = useState({})
    const [materialToAdd, setMaterialToAdd] = useState({ 'material_unit_amount': '' })
    const [addedMaterialsList, setAddedMaterialsList] = useState([])

    const steps = getSteps();

    //gets materials for selector in add materials step
    useEffect(() => {
        onGetMaterials()
    }, [])

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
                            <TextField name="product_number" onChange={handleProductInput} value={newProduct.product_number} id="outlined-basic" label="Product Number" variant="outlined" fullWidth />
                        </div>
                        <div className="textField">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                
                                options={category.map((option) => option.title)}
                                renderInput={(params) => (
                                    <TextField {...params} name='category' onSelect={handleProductInput} value={newProduct.category} label="Category" margin="normal" variant="outlined" fullWidth />
                                )} handleProductInput
                            />
                        </div>
                        <div className="textField">
                            <TextField name="labor" onChange={handleProductInput} value={newProduct.labor} id="outlined-basic" label="Labor (minutes)" variant="outlined" fullWidth />
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

                    //sets into material to add array
                    setMaterialToAdd({
                        ...materialToAdd,
                        material
                    })
                }


                //inputs quantity of materials
                const handleQuantityInput = (e) => {
                    setMaterialToAdd({
                        ...materialToAdd,
                        [e.target.name]: e.target.value
                    })
                }

                //adds material in materialToAdd into the MaterialsArry
                const addToMaterialList = (addMaterial) => {

                    let quantity = +addMaterial.material_unit_amount

                    if (!addMaterial.material) {
                        alert('Please select a material')
                    } else if (isNaN(quantity) || quantity == '') {
                        alert('Please enter a quantity')
                    } else {
                        setAddedMaterialsList([...addedMaterialsList,
                        {
                            material_id: addMaterial.material.id,
                            material_name: addMaterial.material.material_name,
                            unit_price: addMaterial.material.unit_price,
                            material_unit_amount: addMaterial.material_unit_amount
                        }
                        ])

                        setMaterialToAdd({
                            material: {},
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
                    return <div key={item.material_id}>{item.material_name}: {item.material_unit_amount} @ ${item.unit_price} <IconButton onClick={() => deleteMaterial(item.material_id)} aria-label="delete"><DeleteIcon /></IconButton></div>
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
                    <label><b>Product number:</b> here</label>
                    <label><b>Category:</b> {returnedProduct.category}</label>
                    <label><b>Wholesale Price:</b> ${returnedProduct.wholesale}</label>
                    <div className='pricingInputs'>
                        <b>Retail Price:</b> $<TextField name="retail_price" onChange={handleSetPricing} id="standard-basic" label="" />
                    </div>
                    <div className='pricingInputs'>
                        <b>Inventory:</b> <TextField name="quantity" onChange={handleSetPricing} id="standard-basic" label="" />
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
            product_id: product.product_id,
            category: product.category,
            labor: product.labor,
            materials: listMaterials
        }

        const response = await fetch(`http://localhost:8000/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addProduct)
        })

        const returnedProduct = await response.json()

        if (returnedProduct) {
            setNewProduct({ 'product_name': '', 'product_number': '', 'category': '', 'labor': '' })
            setReturnedProduct(returnedProduct.savedProduct)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            console.log("There was an error adding your product")
        }
    }

    //from onclick in last step add retail price and inventory to the db
    const addRetailPriceToDB = async (finalProduct) => {

        //check to make sure retail price is currency
        var regex = /^\d+(?:\.\d{0,2})$/;
        let retail = finalProduct.retail_price

        //check to make sure inventory is a number
        let quantity = +finalProduct.quantity

        if (!finalProduct.retail_price || (!regex.test(retail))) {
            alert('The retail price must be entered in the format X.XX')

        } else if (!finalProduct.quantity || isNaN(quantity)) {
            alert('Inventory must be entered as a whole number')

        } else {
            const response = await fetch('http://localhost:8000/edit-product', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalProduct)
            })

            const result = await response.json()

            if (result) {
                setReturnedProduct({})
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                console.log('there was an error updating your pricing')
            }
        }
    }


    //handle back, next and close handle the nav buttons at the bottom of the screen
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        //check to make sure labor is a number
        let labor = +newProduct.labor

        if (newProduct.product_name == '') {
            alert('Please enter a product name')
        } else if (newProduct.product_number == '') {
            alert('Please enter a product number')
        } else if (newProduct.category == '') {
            alert('Please enter a category')
        } else if (isNaN(labor) || labor === '') {
            alert('Please enter the number of minutes required')
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleClose = () => {
        setActiveStep(0);
    };


    return (
        <div className="addProductsContainer">
            <h2>Add New Product</h2>
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
                                All steps completed - your product is now live
                            </Typography>
                            <Button onClick={handleClose} className={classes.button}>
                                Close
                            </Button>
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

})

const mapDispatchToProps = (dispatch) => ({
    onGetMaterials: GetMaterials(dispatch),

})

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts)