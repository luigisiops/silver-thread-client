import { createAction } from "@reduxjs/toolkit"

export const onGetMaterials = createAction("get.materials")
export const onAddMaterial = createAction("add.material")
export const onDeleteMaterial = createAction("delete.material")

export const onGetSales = createAction("get.sales")
export const onDeleteSale = createAction("delete.sale")
export const onAddSale = createAction("add.sale")
export const onEditSale = createAction("edit.sale")
