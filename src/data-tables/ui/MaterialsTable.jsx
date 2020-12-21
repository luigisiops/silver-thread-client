import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import './MaterialsTable.css'
import { GetMaterials } from "../use-cases/getMaterials"

const MaterialsTable = ({onGetMaterials}) => {

  useEffect(() => {
    //fetchMaterialsList()
  }, [])

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
      <MaterialTable
        title="Silverthread Materials"
        columns={columns}
        data={data}
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
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
      />
    </div>
  )
}

const mapStateToProps = (state, { }) => ({
  materials: state.materials
})

const mapDispatchToProps = (dispatch) => ({
  onGetMaterials: GetMaterials(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTable)