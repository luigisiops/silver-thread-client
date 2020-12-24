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
    const [materialList, setMaterialList] = useState([materials])
    const [selectedMaterial, setSeletctedMaterial] =useState({})
    const [newProduct, setNewProduct] = useState({})
    const [material, setMaterial] = useState({})
    const steps = getSteps();

    useEffect(() => {
        onGetMaterials()
    }, [])


    function getSteps() {

        //these are the steps shown at the top of the stepper
        return ['Product Details', 'Material Costs', 'Set Retail Price'];
    }

    function getStepContent(step) {

        //handles the input of the product name and number
        const detailInput = (e) => {
            setNewProduct({
                ...newProduct,
                [e.target.name]: e.target.value
            })
        }

        const handleSelectedMaterial = (e) => {
            setSeletctedMaterial({
                [e.target.name]: e.target.value
            })
        }

        switch (step) {
            case 0:
                return (
                    <div>
                        <h4>Add Product Details</h4>
                        <TextField name="product_name" onChange={detailInput} id="outlined-basic" label="Product Name" variant="outlined" />
                        <TextField name="product_number" onChange={detailInput} id="outlined-basic" label="Product Number" variant="outlined" />
                    </div>
                );

            case 1:
                return (
                    <div>
                        <h4>Add Materials</h4>
                        <div style={{ width: 300 }}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={materialList.map((option) => option.product_name)}
                                renderInput={(params) => (
                                    <TextField {...params} name='selectedMaterial' onSelected={handleSelectedMaterial} value={selectedMaterial} label="freeSolo" margin="normal" variant="outlined" />
                                )}
                            />
                        </div>




                    </div>
                );
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }


    const handleNext = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    //handles onclick from step 1, sets name and product number in db, returns id #
    const handleProductDetails = () => {
        addNewProduct()
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    //sends name and product number to db, returns id# from onclick step one handleProductDetails
    const addNewProduct = async () => {

        const response = await fetch('http://localhost:8000/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        const result = await response.json()
        setNewProduct(result)
    }


    const handleReset = () => {
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
                                All steps completed - you&apos;re finished
            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
            </Button>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div>

                                    {/* this button shows on the first step and handles sending the name and number to the db */}
                                    {activeStep === 0 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleProductDetails(newProduct)}
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
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        : null}

                                    {/* This button shows on the final step and handles sending wholesale pricing and retail pricing to the db */}
                                    {activeStep === 2 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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