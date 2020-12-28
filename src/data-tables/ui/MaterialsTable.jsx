import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import AddMaterials from './AddMaterials'
import EditMaterials from './EditMaterials'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Popover from '@material-ui/core/Popover';

//import AddMaterialModal from './AddMaterialModal'

import "./AddMaterialModal.css"

import {AddMaterial} from "../use-cases/addMaterial";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial,  materialsDelete, materialsAdd, materialsEdit, onAddMaterial }) => {

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [rowData, setRowData] = useState()
  

  useEffect(() => {  
    onGetMaterials()
  }, [materialsDelete, materialsAdd, materialsEdit])

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
    setOpenAdd(false)
    setOpenEdit(false)
  }

  return (
    <div className='materialsContainer'>
      <h1>Silverthread Materials </h1>
      <Popover
      open={openAdd}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <AddMaterials closeModal = {closeModal}/>
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
            <EditMaterials materialData={rowData} closeModal = {closeModal} />
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
              tooltip: 'Add Sale',
              isFreeAction: true,
              onClick: (event) => setOpenAdd(true)
          },
          {
              icon: 'edit',
              tooltip: 'Edit Row',
              onClick: (event, rowData) => {
                  setRowData(rowData)
                  setOpenEdit(true)
              }
          },
      ]}
        editable={{        
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