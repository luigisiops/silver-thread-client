import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { connect } from "react-redux"
import './MaterialsTable.css'
import { GetMaterials } from "../use-cases/getMaterials"
import { DeleteMaterial } from "../use-cases/deleteMaterial"

const MaterialsTable = ({ onGetMaterials, materials, onDeleteMaterial }) => {

  useEffect(() => {
    onGetMaterials()
  }, [materials])

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

  const [data, setData] = useState([
    { id: '1', name: 'Jump Ring', description: 'small jump ring', unit_price: '.23', category: 'fasteners' },
    { id: '2', name: 'Blue Bead', description: 'small blue bead', unit_price: '.84', category: 'bead' },
    { id: '3', name: 'Leather Chain', description: 'Leather', unit_price: '.3.68', category: 'chain' },
  ])


  return (
    <div className='materialsContainer'>
      <h1>Silverthread Materials </h1>
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
  materials: state.materials.materialsList
})

const mapDispatchToProps = (dispatch) => ({
  onGetMaterials: GetMaterials(dispatch),
  onDeleteMaterial: DeleteMaterial(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)