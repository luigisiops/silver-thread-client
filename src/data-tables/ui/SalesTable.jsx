import MaterialTable from "material-table"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { setAutoFreeze } from "immer"

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"
import Popover from "@material-ui/core/Popover"
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from "@material-ui/pickers"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import IconButton from "@material-ui/core/IconButton"

import "./SalesTable.css"
import AddSales from "./AddSales"
import EditSales from "./EditSales"
import { GetSales } from "../use-cases/getSales"
import { DeleteSale } from "../use-cases/deleteSale"
import { exportCsv } from "../use-cases/exelSalesReports"
import AddMaterial from "../use-cases/addMaterial"

const useStyles = makeStyles((theme) => ({
   root: {
      "& > *": {
         margin: theme.spacing(1),
      },
   },
}))

const SalesTable = ({
   onGetSales,
   sales,
   onDeleteSale,
   salesAdd,
   salesEdit,
   salesDelete,
}) => {
   const classes = useStyles()

   //set date for date-pickers on load
   const getStartDate = () => {
      let d = new Date()
      d.setDate(d.getDate() - 30)
      return d
   }
   let end_date = new Date()
   let start_date = getStartDate()

   const [selectedDate, setSelectedDate] = useState({
      start: start_date,
      end: end_date,
   })
   const [open, setOpen] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const [openAdd, setOpenAdd] = useState(false)
   const [rowData, setRowData] = useState()

   var tableData

   //get sales from db
   useEffect(() => {
      onGetSales(selectedDate)
   }, [salesAdd, salesEdit, salesDelete])

   tableData = sales.map((data) => ({
      ...data,
   }))

   //changes the start date of the reports
   const handleStartDateChange = (date) => {
      setSelectedDate({
         ...selectedDate,
         start: date,
      })
   }

   //changes the end date of the reports
   const handleEndDateChange = (date) => {
      setSelectedDate({
         ...selectedDate,
         end: date,
      })
   }

   //onclick function that runs new sales report based on input dates
   const handleRunSalesReport = (dates) => {
      if (dates.start === null || dates.end === null) {
         alert("Please enter a start and end date for your report")
      } else if (dates.start > dates.end) {
         alert("The start date must be before the end date")
      } else {
         onGetSales(dates)
      }
   }

   const EditSalesModal = ({ closeEditModal }) => {
      return (
         <div className="editSalesModal">
            <div className="closeIconButton">
               <IconButton variant="contained" onClick={() => closeEditModal()}>
                  <HighlightOffIcon />
               </IconButton>
            </div>
            <EditSales saleData={rowData} closeEditModal={closeEditModal} />
         </div>
      )
   }

   const AddSalesModal = ({ closeAddModal }) => {
      return (
         <div className="editSalesModal">
            <div className="closeIconButton">
               <IconButton variant="contained" onClick={() => closeAddModal()}>
                  <HighlightOffIcon />
               </IconButton>
            </div>
            <AddSales saleData={rowData} closeAddModal={closeAddModal} />
         </div>
      )
   }

   const closeEditModal = () => {
      setOpenEdit(false)
   }

   const closeAddModal = () => {
      setOpenAdd(false)
   }

   //sets column headers
   const columns = [
      { title: "id", field: "id", hidden: true },
      { title: "Product ID", field: "product_id", hidden: true },
      { title: "sold_PTM", field: "sold_PTM", align: "left", hidden: true  },
      { title: "Date", field: "date_sold", defaultSort: "desc", align: "left" },
      { title: "Product Number", field: "product_number", align: "left", hidden: true, },
      { title: "Product Name", field: "product_name", align: "left" },
      { title: "Quantity", field: "quantity", align: "left" },
      { title: "Price per Unit", field: "price_per_unit", align: "left", type: "currency", currencySetting: {currencyCode: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,}, },
      { title: "Discount", field: "discount", align: "left" },
      { title: "Total Sales Price", field: "total_price", align: "left", type: "currency", currencySetting: { currencyCode: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,}, },
      { title: "Tax", field: "tax", align: "left", type: "currency", currencySetting: { currencyCode: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2, }, },
      { title: "Shipping", field: "shipping", align: "left", type: "currency", currencySetting: { currencyCode: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2, }, },
      { title: "Category", field: "product_category", align: "left", hidden: true, },
      { title: "Purchased By", field: "sold_to", align: "left" },
   ]

   return (
      <div className="salesContainer">
         <h1>Silverthread Sales </h1>
         <div className="datePickerContainer">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               {/* <Grid container justify="space-around" style={{backgroundColor:'#FFFFFF'}}> */}
               <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  style={{ backgroundColor: "#FFFFFF" }}
               >
                  <KeyboardDatePicker
                     style={{ backgroundColor: "#FFFFFF" }}
                     margin="normal"
                     name="start"
                     id="date-picker-dialog"
                     label="Start Date"
                     format="MM/dd/yyyy"
                     value={selectedDate.start}
                     onChange={handleStartDateChange}
                     KeyboardButtonProps={{
                        "aria-label": "change date",
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
                        "aria-label": "change date",
                     }}
                  />

                  <div
                     className={classes.root}
                     style={{ backgroundColor: "#FFFFFF" }}
                  >
                     <Button
                        onClick={() => handleRunSalesReport(selectedDate)}
                        variant="contained"
                        color="secondary"
                     >
                        Run Report
                     </Button>
                  </div>
               </Grid>
            </MuiPickersUtilsProvider>
         </div>

         <Popover
            open={openAdd}
            anchorReference="anchorPosition"
            anchorPosition={{top: 200, left: 960}}
            anchorOrigin={{
               vertical: "center",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
         >
            <AddSalesModal className="modal" closeAddModal={closeAddModal} />
         </Popover>

         <Popover
            open={openEdit}
            anchorOrigin={{
               vertical: "center",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
         >
            <EditSalesModal className="modal" closeEditModal={closeEditModal} />
         </Popover>

         {sales === [] ? (
            <div>Loading Data....</div>
         ) : (
            <div className="salesMaterialTable">
               <MaterialTable
                  style={{ backgroundColor: "#FFFFFF" }}
                  title="Silverthread Sales"
                  columns={columns}
                  data={tableData}
                  options={{
                     search: false,
                     showTitle: false,
                     filtering: true,
                     exportButton: true,
                     exportCsv,
                     headerStyle: {
                        backgroundColor: "#b71c1c",
                        color: "#FFFFFF",
                     },
                  }}
                  actions={[
                     {
                        icon: "add",
                        tooltip: "Add Sale",
                        isFreeAction: true,
                        onClick: (event) => setOpenAdd(true),
                     },
                     {
                        icon: "edit",
                        tooltip: "Edit Row",
                        onClick: (event, rowData) => {
                           setRowData(rowData)
                           setOpenEdit(true)
                        },
                     },
                  ]}
                  editable={{
                     onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                           setTimeout(() => {
                              // const id = oldData.id
                              onDeleteSale(oldData)
                              resolve()
                           }, 1000)
                        }),
                  }}
               />
            </div>
         )}
      </div>
   )
}

const mapStateToProps = (state, {sales}) => ({
   sales: state.sales.salesList,
   salesAdd: state.sales.newSaleId,
   salesEdit: state.sales.saleEdits,
   salesDelete: state.sales.saleID,
})

const mapDispatchToProps = (dispatch) => ({
   onGetSales: GetSales(dispatch),
   onDeleteSale: DeleteSale(dispatch),
   onAddMaterial: AddMaterial(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesTable)
