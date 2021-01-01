import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export const exportCsv = (allColumns, renderedData) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const dataList = renderedData.map(data => {
        return {
            'Product Number': data.product_num,
            'Product Name': data.product_name,
            'Labor in Minutes': data.labor,
            'Wholesale Price': data.wholesale,
            'Retail Price': data.retail_price,
            'Inventory - Home': data.quantity,
            'Inventory - PTM': data.quantity_painted_tree,      
            'Category': data.category
        }
    })
    const ws = XLSX.utils.json_to_sheet(dataList);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const date = new Date()
    FileSaver.saveAs(data, 'Products List - ' + date.toDateString() + fileExtension);

}