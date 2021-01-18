import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './ProductsTable.css'

import Popover from '@material-ui/core/Popover';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

import EditProduct from './EditProduct'
import AddProducts from './AddProducts'
import CopyProduct from './CopyProduct'
import { GetProducts } from '../use-cases/getProducts'
import { DeleteProduct } from '../use-cases/deleteProduct'
import { exportCsv} from '../use-cases/excelProductsReports'

import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Grid, Card, CardMedia, CardContent } from '@material-ui/core';
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    imageContainer: {
       verticalAlign: 'middle',
       alignItems: 'center',
    },
     card: {
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#eeeeee",
       width: 300,
     },
    content: {
       flex: '1 0 auto',
     },
}));

const AddProductModal = ({ closeModal }) => {
    return (
        <div className="addProductModal">
            <div className='closeIconButton'>
                <IconButton variant="contained" onClick={() => closeModal()}><HighlightOffIcon /></IconButton>
            </div>
            <AddProducts />
        </div>
    )
}

const EditProductModal = ({ closeEditModal, rowData }) => {
    return (
        <div className="addProductModal">
            <div className='closeIconButton'>
                <IconButton variant="contained" onClick={() => closeEditModal()}><HighlightOffIcon /></IconButton>
            </div>
            <EditProduct productData={rowData} closeEditModal={closeEditModal}/>
        </div>
    )
}

const CopyProductModal = ({ closeCopyModal, rowData }) => {
    return (
        <div className="addProductModal">
            <div className='closeIconButton'>
                <IconButton variant="contained" onClick={() => closeCopyModal()}><HighlightOffIcon /></IconButton>
            </div>
            <CopyProduct productData={rowData} closeCopyModal={closeCopyModal}/>
        </div>
    )
}


const ProductsTable = ({ onGetProducts, products, onDeleteProduct, productDelete, productAdd, productEdit }) => {

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openCopy, setOpenCopy] = useState(false)
    const [rowData, setRowData] = useState('')

    var tableData

    //get products from db
    useEffect(() => {
        onGetProducts()
    }, [productDelete, productAdd, productEdit])

    tableData = products.map(data => ({
        ...data
    }))


    //sets column headers
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'labor', field: 'labor', hidden: true, align: 'left' },
        { title: 'Product Number', field: 'product_num', align: 'left' },
        { title: 'Product Name', field: 'product_name', align: 'left' },
        { title: 'Wholesale Price', field: 'wholesale', align: 'left', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:2} },
        { title: 'Retail Price', field: 'retail_price', align: 'left', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:2} },
        { title: 'Category', field: 'category', align: 'left' },
        { title: 'Inventory - Onsite', field: 'quantity', align: 'left' },
        { title: 'Inventory - PTM', field: 'quantity_painted_tree', align: 'left' },
    ]

    const closeModal = () => {
        setOpen(false)
    }

    const closeEditModal = () => {
        setOpenEdit(false)
    }


    const closeCopyModal = () => {
        setOpenCopy(false)
    }

    const classes = useStyles();

    return (
        <div className='productsContainer'>
        <div className="imageContainer" className={classes.imageContainer}>
         <Grid container flexGrow={1} justify="space-between" alignItems="center" spacing={3} justify="center" flexDirection="row">
         <Grid item xs={6} sm={3}>
            <Card className={classes.card} alignItems="center" justifyItems="center">
               <CardContent className={classes.content}>
               <Typography overflow="hidden" variant="h3" align="center"><b>Products</b></Typography>
               </CardContent>
            </Card>
            </Grid>
                 </Grid>
         </div>
            <Popover
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <AddProductModal className="modal" closeModal={closeModal} />
            </Popover>

            <Popover
                open={openEdit}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <EditProductModal className="modal" closeEditModal={closeEditModal} rowData={rowData} />
            </Popover>

            <Popover
                open={openCopy}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <CopyProductModal className="modal" closeCopyModal={closeCopyModal} rowData={rowData} />
            </Popover>

            <div className='productsMaterialTable'>
                <MaterialTable
                    style={{ backgroundColor: '#FFFFFF' }}
                    title="Silverthread Products"
                    columns={columns}
                    data={tableData}

                    options={{
                        search: false,
                        showTitle: false,
                        filtering: true,
                        exportButton: true,                        
                        exportCsv,
                        headerStyle: {
                            backgroundColor: '#f06292',
                            color: '#FFFFFF'
                        },
                    }}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Add Product',
                            isFreeAction: true,
                            onClick: (event) => setOpen(true)
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit Row',
                            onClick: (event, rowData) => {                        
                                setRowData(rowData)
                                setOpenEdit(true)                                
                            }
                        },
                        {
                            icon: 'library_add',
                            tooltip: 'Duplicate Product',
                            onClick: (event, rowData) => {                        
                                setRowData(rowData)
                                // setOpenEdit(true)
                                setOpenCopy(true)                                   
                            }
                        }

                    ]}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const id = oldData.id;
                                    onDeleteProduct(id)
                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </div>
        </div >
    )
}

const mapStateToProps = (state, { }) => ({
    products: state.products.productsList,
    productDelete: state.products.productsDelete,
    productAdd: state.products.newProduct,
    productEdit: state.products.editedProduct

})

const mapDispatchToProps = (dispatch) => ({
    onGetProducts: GetProducts(dispatch),
    onDeleteProduct: DeleteProduct(dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)