import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export const exportCsv = (allColumns, renderedData) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const dataList = renderedData.map(data => {
        return {
            'Date': data.date_sold,
            'Product Number': data.product_number,
            'Product Name': data.product_name,
            'Price Per Unit': data.price_per_unit,
            'Quantity Sold - Home Inventory': data.quantity,
            //need to update this to be PTM inventory once added to db
            'Quantity Sold - PTM Inventory': data.quantity,
            'Discount %': data.discount,
            'Total Revenue': data.total_price,
            'Tax': data.tax,
            'Shipping': data.shipping,
            'Category': data.product_category
        }
    })
    const ws = XLSX.utils.json_to_sheet(dataList);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const date = new Date()
    FileSaver.saveAs(data, 'Sales Report - ' + date.toDateString() + fileExtension);

}