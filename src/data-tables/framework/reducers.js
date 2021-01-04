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
    onAddProduct,
    onGetProducts,
    onDeleteProduct,
<<<<<<< HEAD
    onAddRetail,
   
}from "./actions"
=======
    onAddProduct,
    onEditProduct,
    onGetProductByID,
    onDeleteMaterialItem,
    onAddNewMaterial,
    onUpdateWholesale

} from "./actions"
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73

export const materials = createReducer(
    {
        materialsList: [],
        byId: {},
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
            material.forEach((item) => {
                state.byId[item.id] = item
            })
        },
<<<<<<< HEAD

        [onAddMaterial.type]: (state,{payload: material}) => {
            if (material === null){
                return state
            } 
            state.materialsList = [...state.materialsList, material]
            state.byId[material.id] = material
            
        }, 

        [onDeleteMaterial.type]:(state, {payload: materialid}) => {
=======
        [onDeleteMaterial.type]: (state, { payload: materialid }) => {
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
            if (materialid === null) {
                return state
            }
            state.materialID = materialid
            delete state.byId[materialid.deletedMaterial]

        },
<<<<<<< HEAD
        /*
        [onAddMaterial.type]: (state, {payload: materialDetails }) => {
=======
        [onAddMaterial.type]: (state, { payload: materialDetails }) => {
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
            if (materialDetails === null) {
                return state
            }
            state.materialAdd = materialDetails
<<<<<<< HEAD
        },*/
        [onEditMaterial.type]: (state, {payload: materialEdits}) => {
            if (materialEdits ===  null) {
=======
        },
        [onEditMaterial.type]: (state, { payload: materialEdits }) => {
            if (materialEdits === null) {
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
                return state
            }
            state.materialEdit = materialEdits
        }
    }
)

export const sales = createReducer(
    {
<<<<<<< HEAD
       salesList: [],
       byId: {},
       saleID: '',      
       saleEdits: {} 
    }, 
    {
        [onAddSale.type]: (state,{payload: sale}) => {
            if (sale === null){
                return state
            } 
            state.salesList = [...state.salesList, sale]
            state.byId[sale.id] = sale
            
        }, 

        [onGetSales.type]: (state, {payload: salesList}) => {
=======
        salesList: [],
        saleID: '',
        saleEdits: {}
    },
    {
        [onGetSales.type]: (state, { payload: salesList }) => {
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
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
        byId: {},
        productsDelete: '',
        newProduct: {},
<<<<<<< HEAD
        editedProduct: {},
     }, 
     {
        [onAddProduct.type]: (state,{payload: product}) => {
            if (product === null){
                return state
            } 
            state.productsList = [...state.productsList, product]
            state.byId[product.id] = product
            
        }, 

        [onGetProducts.type]: (state, {payload: products}) => {
            if (products === null){
=======
        productListing: {},
    },
    {
        [onGetProducts.type]: (state, { payload: products }) => {
            if (products === null) {
>>>>>>> a9110dc92a4285cc02b492116ea9d7c4b2de9a73
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

        },
        [onUpdateWholesale.type]: (state, {payload: productDetails}) => {
            if (productDetails === null) {
                return state
            } else {
                state.editedProduct = productDetails
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