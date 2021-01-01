import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export const exportCsv = (allColumns, renderedData) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const dataList = renderedData.map(data => {
        return {
            'Material': data.material_name,
            'Unit of Measure': data.unit,
            'Price Per Unit': data.unit_price,
            'Vendor': data.vendor,
            'Product Number': data.vendor_material_id,
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