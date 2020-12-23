import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import Popover from '@material-ui/core/Popover';
import AddProducts from './AddProducts'



const ProductsTable = ({  }) => {
      
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    //get products from db
    useEffect(() => {
 
    }, [])

    
        //sets column headers
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'labor', field: 'labor', hidden: true },       
        { title: 'Product Number', field: 'product_number' },
        { title: 'Product Name', field: 'product_name' },
        { title: 'Materials', field: '' },       
        { title: 'Wholesale Price', field: 'wholesale' },
        { title: 'Retail Price', field: 'retail_price' },
        { title: 'Category', field: '' },
        { title: 'Inventory', field: 'quantity' },    
    ]

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
                <AddProducts />
            </Popover>

            <div className='productsMaterialTable'>
                <MaterialTable
                style={{backgroundColor:'#FFFFFF'}}
                    title="Silverthread Products"
                    columns={columns}
                    data={data}
                    
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
                                    // put delete fuction here
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


})

const mapDispatchToProps = (dispatch) => ({
  

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)