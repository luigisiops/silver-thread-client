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
    onEditProduct,
    onGetProductByID,
    
    onDeleteMaterialItem,
    onAddNewMaterial,
    onUpdateWholesale

} from "./actions"

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

        [onAddMaterial.type]: (state,{payload: material}) => {
            if (material === null){
                return state
            } 
            state.materialsList = [...state.materialsList, material]
            state.byId[material.id] = material
            
        }, 

        [onDeleteMaterial.type]:(state, {payload: materialid}) => {
            if (materialid === null) {
                return state
            }
            state.materialID = materialid
            delete state.byId[materialid.deletedMaterial]

        },
        /*
        [onAddMaterial.type]: (state, {payload: materialDetails }) => {
            if (materialDetails === null) {
                return state
            }
            state.materialAdd = materialDetails
        },*/
        [onEditMaterial.type]: (state, {payload: materialEdits}) => {
            if (materialEdits ===  null) {
                return state
            }
            state.materialEdit = materialEdits
        }
    }
)

export const sales = createReducer(
    {
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
            if (sales === null) {
                return state
            }
            /*    sales.forEach((sale) => {
                state.byId[sale.id] = sale
            })*/
            return { ...state, salesList }
        },
        [onDeleteSale.type]: (state, { payload: saleid }) => {
            if (saleid === null) {         
                return state
            }           
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
        byCategories:{},
        byId: {},
        productsDelete: '',
        newProduct: {},
        productListing: {},
    },
    {
        [onGetProducts.type]: (state, { payload: products }) => {
          if (products === null) {
            return state;
          }
          state.productsList = products;
          products.forEach((product)=>{
            state.byId[product.id] = product
            if (!state.byCategories[product.category]) {
                state.byCategories[product.category] = [product]
            }
            else{
                state.byCategories[product.category] = [...state.byCategories[product.category], product]
            }
          })


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