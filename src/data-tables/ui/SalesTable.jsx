import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { setAutoFreeze } from 'immer'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Popover from '@material-ui/core/Popover';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './SalesTable.css'
import AddSales from './AddSales'
import EditSales from './EditSales'
import { GetSales } from '../use-cases/getSales';
import { DeleteSale } from '../use-cases/deleteSale';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const SalesTable = ({ onGetSales, sales, onDeleteSale }) => {
    const classes = useStyles();
    console.log(sales.salesList)

    //set date for date-pickers
    let end_date = new Date()
    let start_date = new Date().setDate(end_date.getDate() - 30)

    const [selectedDate, setSelectedDate] = useState({ start: start_date, end: end_date });
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(sales)
    const [openEdit, setOpenEdit] = useState(false)
    const [rowData, setRowData] = useState()

    var tableData

    //get sales from db
    useEffect(() => {
        onGetSales()       
    }, [])

    tableData = sales.map(data => ({
        ...data
    }))

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
        { title: 'Date', field: 'createdAt' },
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
                    <Grid container justify="space-around" style={{backgroundColor:'#FFFFFF'}}>
                        <KeyboardDatePicker
                            style={{backgroundColor:'#FFFFFF'}}
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
                <div className={classes.root} style={{backgroundColor:'#FFFFFF'}}>
                    <Button variant="contained" color="secondary">
                        Submit
                </Button>
                </div>
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

            {sales === [] ?
                <div>Loading Data....</div>
                :
                <div className='salesMaterialTable'>
                    <MaterialTable
                        style={{backgroundColor:'#FFFFFF'}}
                        title="Silverthread Sales"
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
                                backgroundColor: '#b71c1c',
                                color: '#FFFFFF'
                            },
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Add Sale',
                                isFreeAction: true,
                                onClick: (event) => setOpen(true)
                            },
                            {
                                icon: 'edit',
                                tooltip: 'Edit Row',
                                onClick: (event, rowData) => {
                                    setRowData(rowData)
                                    setOpenEdit(true)
                                    console.log(rowData)
                                }
                            }
                        ]}
                        editable={{
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const id = oldData.id;
                                        onDeleteSale(id)
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </div>}
        {/* </div> */}
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
            <EditSales saleData={rowData} />
        </Popover>
        </div >
    )
}

const mapStateToProps = (state, { }) => ({
    sales: state.sales.salesList
})

const mapDispatchToProps = (dispatch) => ({
    onGetSales: GetSales(dispatch),
    onDeleteSale: DeleteSale(dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)