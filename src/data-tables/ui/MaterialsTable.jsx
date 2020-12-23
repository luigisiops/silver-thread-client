import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import AddMaterials from './AddMaterials'
import EditMaterials from './EditMaterials'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"
import Popover from '@material-ui/core/Popover';

const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial,  materialsDelete, materialsAdd, materialsEdit }) => {

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
    { title: 'Name', field: 'material_name' },
    { title: 'Unit', field: 'unit' },
    { title: 'Price per Unit', field: 'unit_price' },
    { title: 'Category', field: 'category' },
    { title: 'Vendor', field: 'vendor' },
    { title: 'Product Number', field: 'vendor_material_id' },
  ]

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
  onDeleteMaterial: DeleteMaterial(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)