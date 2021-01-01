import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './ProductsTable.css'

import Popover from '@material-ui/core/Popover';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

import EditProduct from './EditProduct'
import AddProducts from './AddProducts'
import { GetProducts } from '../use-cases/getProducts'
import { DeleteProduct } from '../use-cases/deleteProduct'
import { exportCsv} from '../use-cases/excelProductsReports'


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

const EditProductModal = ({ closeEditModal }) => {
    return (
        <div className="addProductModal">
            <div className='closeIconButton'>
                <IconButton variant="contained" onClick={() => closeEditModal()}><HighlightOffIcon /></IconButton>
            </div>
            <EditProduct />
        </div>
    )
}


const ProductsTable = ({ onGetProducts, products, onDeleteProduct, productDelete, productAdd, productEdit }) => {

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
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
        { title: 'Inventory', field: 'quantity', align: 'left' },
        { title: 'Inventory - PTM', field: 'quantity_painted_tree', align: 'left' },
    ]

    const closeModal = () => {
        setOpen(false)
    }

    const closeEditModal = () => {
        setOpenEdit(false)
    }

    return (
        <div className='productsContainer'>
            <h1>Silverthread Products </h1>
            <Popover
                open={open}
                anchorOrigin={{
                    vertical: 'center',
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
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <EditProductModal className="modal" closeEditModal={closeEditModal}  />
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
                                console.log(rowData)
                                // setRowData(rowData.id)
                                setOpenEdit(true)                                
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