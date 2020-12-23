import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import AddMaterials from './AddMaterials'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Popover from '@material-ui/core/Popover';
import { onAddMaterial } from '../framework/actions';
import AddMaterial from '../use-cases/addMaterial';

const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial,  materialsDelete, materialsAdd }) => {

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    console.log('fired')
    onGetMaterials()
  }, [materialsDelete, materialsAdd])

  let tableData = materials.map(data => ({
    ...data
}))
  const columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'Name', field: 'material_name' },
    { title: 'Unit', field: 'unit' },
    { title: 'Price per Unit', field: 'unit_price' },
    { title: 'Category', field: 'category' },
    { title: 'Vendor', field: 'vendor' },
    { title: 'Product Number', field: 'vendor_material_id' },
  ]

  // const [data, setData] = useState([
  //   { id: '1', name: 'Jump Ring', description: 'small jump ring', unit_price: '.23', category: 'fasteners' },
  //   { id: '2', name: 'Blue Bead', description: 'small blue bead', unit_price: '.84', category: 'bead' },
  //   { id: '3', name: 'Leather Chain', description: 'Leather', unit_price: '.3.68', category: 'chain' },
  // ])


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
                <AddMaterials />
            </Popover>

      <MaterialTable
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
            backgroundColor: '#78bfb5',
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
                  // setRowData(rowData)
                  // setOpenEdit(true)
                  // console.log(rowData)
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
  materialsAdd: state.materials.materialAdd
   
})

const mapDispatchToProps = (dispatch) => ({
  onGetMaterials: GetMaterials(dispatch),
  onDeleteMaterial: DeleteMaterial(dispatch),
 
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)