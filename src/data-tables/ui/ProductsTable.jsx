import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import './ProductsTable.css'

import Popover from '@material-ui/core/Popover';

import AddProducts from './AddProducts'
import {GetProducts} from '../use-cases/getProducts'
import {DeleteProduct} from '../use-cases/deleteProduct'
import { onDeleteProduct } from '../framework/actions';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

const AddProductModal = ({ closeModal }) => {
    return(
        <div className="addProductModal">
            <div className='closeIconButton'>
             <IconButton variant = "contained" onClick = {() => closeModal()}><HighlightOffIcon/></IconButton>
             </div>                       
            <AddProducts />
        </div>
    )
}    


const ProductsTable = ({ onGetProducts, products, onDeleteProduct, productDelete }) => {
      
    const [open, setOpen] = useState(false)
    
    var tableData

    //get products from db
    useEffect(() => {
        onGetProducts()
    }, [productDelete])

    tableData = products.map(data => ({
        ...data
    }))
    

        //sets column headers
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'labor', field: 'labor', hidden: true },       
        { title: 'Product Number', field: 'product_number' },
        { title: 'Product Name', field: 'product_name' },
        { title: 'Materials', field: '' },       
        { title: 'Wholesale Price', field: 'wholesale' },
        { title: 'Retail Price', field: 'retail_price' },
        { title: 'Category', field: 'category' },
        { title: 'Inventory', field: 'quantity' },    
    ]

    const closeModal = () => {
        setOpen(false)
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
                <AddProductModal className = "modal" closeModal = {closeModal}/>
            </Popover>

            <div className='productsMaterialTable'>
                <MaterialTable
                style={{backgroundColor:'#FFFFFF'}}
                    title="Silverthread Products"
                    columns={columns}
                    data={tableData}
                    
                    options={{
                        search: false,
                        showTitle: false,
                        filtering: true,
                        addRowPosition: 'first',
                        exportButton: true,
                        //export csv is a function we can use to override the generic export and export to excel
                        // exportCsv
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
    productDelete: state.products.productsDelete

})

const mapDispatchToProps = (dispatch) => ({
  onGetProducts: GetProducts(dispatch),
  onDeleteProduct: DeleteProduct(dispatch)
  
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)