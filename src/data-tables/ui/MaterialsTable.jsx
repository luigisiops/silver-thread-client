import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import "./AddMaterialModal.css"
import AddMaterials from './AddMaterials'
import EditMaterials from './EditMaterials'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Popover from '@material-ui/core/Popover';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

// import Popover from '@material-ui/core/Popover';
//import AddMaterialModal from './AddMaterialModal'

import {AddMaterial} from "../use-cases/addMaterial";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const AddMaterialModal = ({closeModal }) => {

    return(
        <div className = "add-material-container">
           <div className='closeIconButton'>
                <IconButton variant="contained" onClick={() => closeModal()} ><HighlightOffIcon /></IconButton>
            </div>
            <AddMaterials closeModal = {closeModal}/>      
        </div>
     
    )
}

const EditMaterialModal = ({closeEditModal, rowData }) => {
   
  return(
      <div className = "edit-material-container">
         <div className='closeIconButton'>
              <IconButton variant="contained" onClick={() => closeEditModal()} ><HighlightOffIcon /></IconButton>
          </div>
          <EditMaterials materialData={rowData} closeEditModal = {closeEditModal}/>      
      </div>
   
  )
}


const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial, materialsEdit, materialsDelete, materialsAdd}) => {
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

  let tableData = materials.map(data => ({
    ...data
  }))

  const columns = [
    { title: 'id', field: 'id', hidden: false },
    { title: 'Name', field: 'material_name', align: 'left' }, 
    { title: 'Unit of Measure', field: 'unit', align: 'left'  }, 
    { title: 'Price per Unit', field: 'unit_price', align: 'left', type:'currency', currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:2} },
    { title: 'Vendor', field: 'vendor', align: 'left'  },
    { title: 'Product Number', field: 'vendor_material_id', align: 'left' },
    { title: 'Category', field: 'category', align: 'left' },
  ]

  return (
    <div className='materialsContainer'>
      <h1>Silverthread Materials </h1>
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
        <AddMaterialModal className = "modal" closeModal = {closeModal}/>
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
          <EditMaterialModal rowData={rowData} closeEditModal = {closeEditModal} />
          </Popover>
        
      <MaterialTable
        style={{backgroundColor:'#FFFFFF'}}
        title="Silverthread Materials"
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
            backgroundColor: '#01579b',
            // backgroundColor: '#78bfb5',
            color: '#FFFFFF'
          }
        }}

        actions={[
          {
            icon: 'add',
            tooltip: 'Add Material',
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
          }
        ]}

        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const id = oldData.id;
                console.log(id)
                onDeleteMaterial(id)
                resolve()
              }, 1000)
            }),
        }}

      />
    </div>
  )
}

const mapStateToProps = (state, {materials}) => ({
  materials: state.materials.materialsList,
  materialsDelete: state.materials.materialID,
  materialsAdd: state.materials.materialAdd,
  materialsEdit: state.materials.materialEdit
})

const mapDispatchToProps = (dispatch) => ({
  onGetMaterials: GetMaterials(dispatch),
  onAddMaterial: AddMaterial(dispatch),
  onDeleteMaterial: DeleteMaterial(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)