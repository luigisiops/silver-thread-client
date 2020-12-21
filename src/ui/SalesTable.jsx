import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';


const SalesTable = () => {

    const [dates, setDates] = useState({})

    useEffect(() => {
      //fetchSalesList()
    }, [])
 
    const columns = [
      { title: 'id', field: 'id', hidden: true},
      { title: 'Product Number', field: 'product_num' },
      { title: 'Product Name', field: 'product_id' },   
      { title: 'Quantity', field: 'quantity' },  
      { title: 'Price per Unit', field: 'unit_price' },
      { title: 'Total Sales Price', field: 'unit_price' },
      { title: 'Category', field: 'category'},
      { title: 'Purchased By', field: 'sold'},
    ]
    
    const [data, setData] = useState([
        { id: '1', name: 'Jump Ring', description: 'small jump ring', unit_price: '.23', category: 'fasteners' },
        { id: '2', name: 'Blue Bead', description: 'small blue bead', unit_price: '.84', category: 'bead' },
        { id: '3', name: 'Leather Chain', description: 'Leather', unit_price: '.3.68', category: 'chain' },
    ]) 

    const handleAddSales = () => {
        console.log('sales add function')
    }

      
    return (
      <div className='materialsContainer'>
        <h1>Silverthread Sales </h1>
      <MaterialTable      
        title="Silverthread Sales"
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
          },      
        }}
        actions={[
            {
              icon: 'add',
              tooltip: 'Add Sale',
              isFreeAction: true,
            //   onClick: (event) => alert("You want to add a new row")
              onClick: (event) => handleAddSales()
            }
          ]}  
        editable={{          
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
 
export default SalesTable