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
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Autocomplete from '@material-ui/lab/Autocomplete';


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

const AddProducts = ({ onGetMaterials, materials, onDeleteMaterial, materialsDelete }) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [newProduct, setNewProduct] = useState({})
    const [returnedProduct, setReturnedProduct] = useState({})
    const [materialToAdd, setMaterialToAdd] = useState({})
    const [addedMaterialsList, setAddedMaterialsList] = useState([])

    const steps = getSteps();

    useEffect(() => {
        //gets materials for selector in add materials step
        onGetMaterials()
    }, [])

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
            setNewProduct({})
            setReturnedProduct(returnedProduct.savedProduct)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            console.log("There was an error adding your product")
        }

    }

    //from onclick in last step add retail price and inventory to the db
    const addRetailPriceToDB = async (finalProduct) => {
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


    function getSteps() {
        //these are the steps shown at the top of the stepper
        return ['Enter Product', 'Add Materials', 'Set Pricing'];
    }

    function getStepContent(step) {

        switch (step) {
            //Input product name, product number, categorgy, labor time
            case 0:
                const category = [{ title: 'Earrings' }, { title: 'Necklaces' }, { title: 'Bracelets' }, { title: 'Rings' }, { title: 'Mezuzzahs' }, { title: 'Brooches' }, { title: 'Chains' }, { title: 'Other' }]

                //handles the input of the product name and number
                const handleProductInput = (e) => {
                    setNewProduct({
                        ...newProduct,
                        [e.target.name]: e.target.value
                    })
                }

                return (
                    <div>
                        <h4>Add Product Details</h4>
                        <TextField name="product_name" onChange={handleProductInput} id="outlined-basic" label="Product Name" variant="outlined" />
                        <TextField name="product_number" onChange={handleProductInput} id="outlined-basic" label="Product Number" variant="outlined" />
                        <div style={{ width: 300 }}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={category.map((option) => option.title)}
                                renderInput={(params) => (
                                    <TextField {...params} name='category' onSelect={handleProductInput} label="Category" margin="normal" variant="outlined" />
                                )} handleProductInput
                            />
                        </div>
                        <TextField name="labor" onChange={handleProductInput} id="outlined-basic" label="Labor" variant="outlined" />
                    </div>
                );

            //Input materials and quantity into Materials Array    
            case 1:
                //STEP 2 -handles selection on material from selection picker
                const handleMaterialInput = (e) => {
                    let materialItem = e.target.value

                    let material = materials.find(item => {
                        return item.material_name == materialItem

                    })

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
                const addToMaterialArray = (addMaterial) => {

                    setAddedMaterialsList([...addedMaterialsList,
                    {
                        id: addMaterial.material.id,
                        material_name: addMaterial.material.material_name,
                        unit_price: addMaterial.material.unit_price,
                        material_unit_amount: addMaterial.material_unit_amount

                    }
                    ])

                }

                const displayMaterialList = addedMaterialsList.map(item => {
                    return <li key={item.id}>{item.material_name}: {item.material_unit_amount} @ ${item.unit_price} </li>
                })


                return (
                    <div>
                        <h4>Add Materials</h4>
                        <div style={{ width: 300 }}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={materials.map((option) => option.material_name)}
                                renderInput={(params) => (
                                    <TextField {...params} name='material' onSelect={handleMaterialInput} label="Select Material" margin="normal" variant="outlined" />
                                )}
                            />
                            <TextField name="material_unit_amount" onChange={handleQuantityInput} id="outlined-basic" label="Quantity" variant="outlined" />
                        </div>
                        <Button onClick={() => addToMaterialArray(materialToAdd)} variant="contained" color="primary" className={classes.button} >
                            Add Material
                            </Button>
                        <div>
                            {displayMaterialList}
                        </div>

                    </div>
                );


            case 2:
                //bring product details - list all product details and add retail price and inventory

                const handleSetPricing = (e) => {
                    setReturnedProduct({
                        ...returnedProduct,
                        [e.target.name]: e.target.value
                    })

                }

                return <div className="pricingContainer">
                    <h4>Set Pricing</h4>
                    <label>Name: {returnedProduct.product_name}</label>
                    <label>Product number here</label>
                    <label>Category: {returnedProduct.category}</label>
                    <label>Wholesale Price: <TextField name="wholelsale" value={returnedProduct.wholesale} onChange={handleSetPricing} id="outlined-basic" label="Wholesale" variant="outlined" /></label>
                    <label>Retail Price: <TextField name="retail_price" onChange={handleSetPricing} id="outlined-basic" label="Retail" variant="outlined" /></label>
                    <label>Inventory: <TextField name="quantity" onChange={handleSetPricing} id="outlined-basic" label="Inventory" variant="outlined" /></label>
                </div>
            default:
                return 'Unknown step';
        }
    }


    //handle back, next and close handle the nav buttons at the bottom of the screen
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleClose = () => {
        setActiveStep(0);
    };


    return (
        <div className="addProductsContainer">
            <h1>Add Products</h1>
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
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        Back
                                </Button>

                                    {/* this button shows on the first step and handles sending the name and number to the db */}
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


                                    {/* This button shows on the second step and handles sending the materials to the materials by product table in db */}
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

                                    {/* This button shows on the final step and handles sending retail pricing and inventory to the db */}
                                    {activeStep === 2 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => addRetailPriceToDB(returnedProduct)}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Save Product' : 'Next'}
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
    materialsDelete: state.materials.materialID,
    // materialsAdd: state.materials.materialAdd,
    // materialsEdit: state.materials.materialEdit
})

const mapDispatchToProps = (dispatch) => ({
    onGetMaterials: GetMaterials(dispatch),
    onDeleteMaterial: DeleteMaterial(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts)