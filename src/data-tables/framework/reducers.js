import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onAddMaterial,
    onDeleteMaterial,
    onEditMaterial,
    onGetSales,
    onDeleteSale,
    onAddSale,
    onEditSale,
    onGetProducts,
    onDeleteProduct,
    onAddProduct,
    onEditProduct,
    onGetProductByID,
    onDeleteMaterialItem,
    onAddNewMaterial

} from "./actions"

export const materials = createReducer(
    {
        materialsList: [],
        materialID: '',
        materialAdd: '',
        materialEdit: '',
    },
    {
        [onGetMaterials.type]: (state, { payload: material }) => {
            if (material === null) {
                return state
            }
            state.materialsList = material
        },
        [onDeleteMaterial.type]: (state, { payload: materialid }) => {
            if (materialid === null) {
                return state
            }
            state.materialID = materialid
        },
        [onAddMaterial.type]: (state, { payload: materialDetails }) => {
            if (materialDetails === null) {
                return state
            }
            state.materialAdd = materialDetails
        },
        [onEditMaterial.type]: (state, { payload: materialEdits }) => {
            if (materialEdits === null) {
                return state
            }
            state.materialEdit = materialEdits
        }
    }
)

export const sales = createReducer(
    {
        salesList: [],
        saleID: '',
        saleEdits: {}
    },
    {
        [onGetSales.type]: (state, { payload: salesList }) => {
            if (sales === null) {
                return state
            }
            /*    sales.forEach((sale) => {
                state.byId[sale.id] = sale
            })*/
            return { ...state.salesList, salesList }
        },
        [onDeleteSale.type]: (state, { payload: saleid }) => {
            if (saleid === null) {
                console.log(null)
                return state
            }
            console.log(saleid)
            state.saleID = saleid
        },
        [onAddSale.type]: (state, { payload: newSaleId }) => {
            if (newSaleId === null) {
                return state
            }
            state.newSaleId = newSaleId
        },
        [onEditSale.type]: (state, { payload: saleDetails }) => {
            if (saleDetails === null) {
                return state
            }
            state.saleEdits = saleDetails
        }
    }
)

export const products = createReducer(
    {
        productsList: [],
        productsDelete: '',
        newProduct: {},
        productListing: {},
    },
    {
        [onGetProducts.type]: (state, { payload: products }) => {
            if (products === null) {
                return state
            }
            state.productsList = products
        },
        [onDeleteProduct.type]: (state, { payload: productid }) => {
            if (productid === null) {
                return state
            }
            state.productsDelete = productid
        },
        [onAddProduct.type]: (state, { payload: newProduct }) => {
            if (newProduct === null) {
                return state
            } else {
                state.newProduct = newProduct
            }

        },
        [onEditProduct.type]: (state, { payload: editedProduct }) => {
            if (editedProduct === null) {
                return state
            } else {
                state.editedProduct = editedProduct
            }
        },
        [onGetProductByID.type]: (state, { payload: productListing }) => {
            if (productListing === null) {
                return state
            } else {
                state.productListing = productListing
            }

        }
    }
)

export const materialByProduct = createReducer(
    {
        materialItem: {},
        newMaterial: []
    },
    {
    [onDeleteMaterialItem.type]: (state, { payload: materialID }) => {
        if (materialID === null) {
            return state
        } else {
            state.materialItem = materialID
        }
    },
    [onAddNewMaterial.type]: (state, {payload: newMaterial}) => {
        if (newMaterial === null) {
            return state
        } else {
            state.newMaterial = newMaterial
        }
    }

})

export default { materials, sales, products, materialByProduct }