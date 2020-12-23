import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import { AddMaterial } from "../use-cases/addMaterial"

import Popover from '@material-ui/core/Popover';
import AddMaterialModal from './AddMaterialModal'


const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial, onAddMaterial }) => {
  const [open, setOpen] = useState(false)

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
        <AddMaterialModal />
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

const mapStateToProps = (state, { materials }) => ({
  materials: state.materials.materialsList
})

const mapDispatchToProps = (dispatch) => ({
  onGetMaterials: GetMaterials(dispatch),
  onAddMaterial: AddMaterial(dispatch),
  onDeleteMaterial: DeleteMaterial(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)