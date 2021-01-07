import MaterialTable from "material-table"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import "./MaterialsTable.css"
import "./AddMaterialModal.css"
import AddMaterials from "./AddMaterials"
import EditMaterials from "./EditMaterials"
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import { AddMaterial } from "../use-cases/addMaterial"
import Popover from "@material-ui/core/Popover"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import IconButton from "@material-ui/core/IconButton"
import { exportCsv } from "../use-cases/excelMaterialsReports"
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Grid, Card, CardMedia, ThemeProvider, CssBaseline, CardContent } from '@material-ui/core';



import logo from '../../login/images/logo.png'
import { Typography } from "@material-ui/core"


const AddMaterialModal = ({ closeModal }) => {
   return (
      <div className="add-material-container">
         <div className="closeIconButton">
            <IconButton variant="contained" onClick={() => closeModal()}>
               <HighlightOffIcon />
            </IconButton>
         </div>
         <AddMaterials closeModal={closeModal} />
      </div>
   )
}

const EditMaterialModal = ({ closeEditModal, rowData }) => {
   return (
      <div className="edit-material-container">
         <div className="closeIconButton">
            <IconButton variant="contained" onClick={() => closeEditModal()}>
               <HighlightOffIcon />
            </IconButton>
         </div>
         <EditMaterials
            materialData={rowData}
            closeEditModal={closeEditModal}
         />
      </div>
   )
}

const MaterialsTable = ({
   onGetMaterials,
   materials,
   onDeleteMaterial,
   materialsEdit,
   materialsDelete,
   materialsAdd,
}) => {
   const [open, setOpen] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const [rowData, setRowData] = useState()

   const closeModal = () => {
      setOpen(false)
   }

   const closeEditModal = () => {
      setOpenEdit(false)
   }

   useEffect(() => {
      onGetMaterials()
   }, [materialsEdit, materialsDelete, materialsAdd])

   let tableData = materials.map((data) => ({
      ...data,
   }))

   const columns = [
      { title: "id", field: "id", hidden: true },
      { title: "Material", field: "material_name", align: "left" },
      { title: "Unit of Measure", field: "unit", align: "left" },
      {
         title: "Price per Unit",
         field: "unit_price",
         align: "left",
         type: "currency",
         currencySetting: {
            currencyCode: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
         },
      },
      { title: "Vendor", field: "vendor", align: "left" },
      { title: "Product Number", field: "vendor_material_id", align: "left" },
      { title: "Category", field: "category", align: "left" },
   ]

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

  const classes = useStyles();

   return (
      <div className="materialsContainer">
         <div className="imageContainer" className={classes.imageContainer}>
         <Grid container flexGrow={1} justify="space-between" alignItems="center" spacing={3} justify="center" flexDirection="row">
         <Grid item xs={6} sm={3}>
            <Card className={classes.card} alignItems="center" justifyItems="center">
               <CardContent className={classes.content}>
               <Typography variant="h3" align="center"><b className={classes.typo}>Materials</b></Typography>
               </CardContent>
            </Card>
            </Grid>
                 </Grid>
         </div>
         <Popover
            open={open}
            anchorOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
         >
            <AddMaterialModal className="modal" closeModal={closeModal} />
         </Popover>

         <Popover
            open={openEdit}
            anchorOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
         >
            <EditMaterialModal
               rowData={rowData}
               closeEditModal={closeEditModal}
            />
         </Popover>

         <MaterialTable
            style={{ backgroundColor: "#FFFFFF" }}
            title="Silverthread Materials"
            columns={columns}
            data={tableData}
            options={{
               search: false,
               showTitle: false,
               filtering: true,
               exportButton: true,
               exportCsv,
               headerStyle: {
                  backgroundColor: "#01579b",
                  color: "#FFFFFF",
               },
            }}
            actions={[
               {
                  icon: "add",
                  tooltip: "Add Material",
                  isFreeAction: true,
                  onClick: (event) => setOpen(true),
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
                        const id = oldData.id
                        onDeleteMaterial(id)
                        resolve()
                     }, 1500)
                  }),
            }}
         />
      </div>
   )
}

const mapStateToProps = (state, { materials }) => ({
   materials: state.materials.materialsList,
   materialsDelete: state.materials.materialID,
   materialsAdd: state.materials.materialAdd,
   materialsEdit: state.materials.materialEdit,
})

const mapDispatchToProps = (dispatch) => ({
   onGetMaterials: GetMaterials(dispatch),
   onAddMaterial: AddMaterial(dispatch),
   onDeleteMaterial: DeleteMaterial(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)
