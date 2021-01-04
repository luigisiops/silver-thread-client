import { createAction } from "@reduxjs/toolkit"

export const onGetMaterials = createAction("get.materials")
export const onAddMaterial = createAction("add.material")
export const onDeleteMaterial = createAction("delete.material")
// export const onAddMaterial = createAction("add.material")
export const onEditMaterial = createAction("edit.material")

export const onGetSales = createAction("get.sales")
export const onDeleteSale = createAction("delete.sale")
export const onAddSale = createAction("add.sale")
export const onEditSale = createAction("edit.sale")

export const onGetProducts = createAction("get.products")
export const onDeleteProduct = createAction("delete.products")
export const onAddProduct = createAction('add.product')
<<<<<<< HEAD
export const onAddRetail = createAction('add.retailProduct')
export const onEditProduct = createAction('edit.product')
=======
export const onEditProduct = createAction('edit.product')
export const onGetProductByID = createAction('get.productByID')
export const onUpdateWholesale = createAction('edit.wholesalePrice')

export const onDeleteMaterialItem = createAction('delete.materialItem')
export const onAddNewMaterial = createAction('add.newMaterial')
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
