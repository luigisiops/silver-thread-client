import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Popover from '@material-ui/core/Popover';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

import AddSales from './AddSales'
import { GetSales } from '../use-cases/getSales';


const SalesTable = ({onGetSales, sales}) => {

   //set date for date-pickers
    let end_date = new Date()
    let start_date = new Date().setDate(end_date.getDate() - 30)
 
    const [selectedDate, setSelectedDate] = useState({ start: start_date, end: end_date });
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
      
    //get sales from db
    useEffect(() => {
        onGetSales()
    }, [])

    console.log(sales)

    // const onGetSalesList = async () => {
    //     let response = await fetch('http://localhost:8000/sales/getAllSales')
    //     let result = await response.json()
    //     setData(result)
    // }

    //onclick function from add icon - toggles Add Sales popper to open
    const handleAddSales = () => {
        setOpen(true)
    }

    //changes the start date of the reports
    const handleStartDateChange = (date) => {
        setSelectedDate({
            ...selectedDate,
            start: date
        });
    };

    //changes the end date of the reports
    const handleEndDateChange = (date) => {
        setSelectedDate({
            ...selectedDate,
            end: date
        });
    };

    //sets column headers
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'Product ID', field: 'product_id', hidden: true },
        { title: 'Product Number', field: 'product_number' },
        { title: 'Product Name', field: 'product_name' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Price per Unit', field: 'price_per_unit' },
        { title: 'Total Sales Price', field: 'total_price' },
        { title: 'Category', field: 'product_category' },
        { title: 'Purchased By', field: 'sold_to' },
    ]

    return (
        <div className='salesContainer'>
            <h1>Silverthread Sales </h1>
            <div className='datePickerContainer'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            name="start"
                            id="date-picker-dialog"
                            label="Start Date"
                            format="MM/dd/yyyy"
                            value={selectedDate.start}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <KeyboardDatePicker
                            margin="normal"
                            name="end"
                            id="date-picker-dialog"
                            label="End Date"
                            format="MM/dd/yyyy"
                            value={selectedDate.end}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>

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
                <AddSales />
            </Popover>

            <div className='salesMaterialTable'>
                <MaterialTable
                    title="Silverthread Sales"
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
                            backgroundColor: '#78bfb5',
                            color: '#FFFFFF'
                        },
                    }}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Add Sale',
                            isFreeAction: true,
                            onClick: (event) => handleAddSales()
                        }
                    ]}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);
                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setData([...dataDelete]);

                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </div>
        </div >
    )
}

const mapStateToProps = (state, {}) => ({
        sales: state.sales.salesList
    
})

const mapDispatchToProps = (dispatch) => ({
        onGetSales: GetSales(dispatch)
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)