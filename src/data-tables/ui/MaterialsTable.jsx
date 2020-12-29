import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import AddMaterials from './AddMaterials'
import EditMaterials from './EditMaterials'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Popover from '@material-ui/core/Popover';

// import Popover from '@material-ui/core/Popover';
//import AddMaterialModal from './AddMaterialModal'

import "./AddMaterialModal.css"

import {AddMaterial} from "../use-cases/addMaterial";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const AddMaterialModal = ({materials, onAddMaterial, closeModal }) => {
    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }
    console.log(fields)

    return(
        <div className = "add-material-container">
        <Button variant = "contained" onClick = {() => closeModal()}>Close</Button>
            <div>Add Material</div>
                <div className="material-input"><TextField id="outlined-basic" label="Name" variant="outlined" name = "materialName" onChange = {setField}/></div> 
                <div className="material-input"><TextField id="outlined-basic" label="Vendor" variant="outlined" name = "vendor" onChange = {setField}/></div> 
                <div className="material-input"><TextField id="outlined-basic" label="Vendor Material Id" variant="outlined" name = "vendorMaterialId" onChange = {setField}/></div> 
                <div className="material-input"><TextField id="outlined-basic" label="Unit" variant="outlined" name = "unit" onChange = {setField}/></div> 
                <div className="material-input"><TextField id="outlined-basic" label="Unit Price" variant="outlined" name = "unitPrice" onChange = {setField}/></div> 
                <div className="material-input"><TextField id="outlined-basic" label="Category" variant="outlined" name = "category" onChange = {setField}/></div> 
            <Button variant = "contained" onClick = {()=> onAddMaterial(fields)}>Add</Button>
        </div>
     
    )
}


const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial, onAddMaterial }) => {
  const [open, setOpen] = useState(false)

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [rowData, setRowData] = useState()
  

  useEffect(() => {  
    onGetMaterials()
  }, [])

  let tableData = materials.map(data => ({
    ...data
  }))
  const columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Price per Unit', field: 'unit_price' },
    { title: 'Category', field: 'category' },
  ]

  const [data, setData] = useState([
    { id: '1', name: 'Jump Ring', description: 'small jump ring', unit_price: '.23', category: 'fasteners' },
    { id: '2', name: 'Blue Bead', description: 'small blue bead', unit_price: '.84', category: 'bead' },
    { id: '3', name: 'Leather Chain', description: 'Leather', unit_price: '.3.68', category: 'chain' },
  ])

  const closeModal = () => {
    setOpen(false)
  }

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
            <EditMaterials materialData={rowData} />
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
              console.log(rowData)
            }
          }
        ]}

        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000)
            }),
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
                const id = oldData.id;
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