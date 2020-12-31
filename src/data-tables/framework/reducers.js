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
    onAddRetail,
   
}from "./actions"

export const materials = createReducer(
    {
        materialsList: [],
        byId: {},
        materialID: '',
        materialAdd: '',
        materialEdit: '',
    },
    {
        [onGetMaterials.type]: (state, {payload: material}) => {
            if (material === null){
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
            return {...state.salesList, salesList}
        },
        [onDeleteSale.type]: (state, {payload: saleid}) => {            
            if (saleid === null) {
                console.log(null)
                return state
            }
            console.log(saleid)
            state.saleID = saleid   
        },
        [onAddSale.type]: (state, {payload:newSaleId}) => {
            if(newSaleId === null){
                return state
            }
            state.newSaleId = newSaleId
        },          
        [onEditSale.type]: (state, {payload: saleDetails}) => {
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
                return state
            }            
            state.productsList = products
        },
        [onDeleteProduct.type]: (state, {payload: productid}) => {
            if (productid === null){
                return state
            }          
            state.productsDelete = productid
        },
        [onAddProduct.type]:(state, {payload: newProduct}) => {
            if (newProduct === null) {
                return state
            } else {
                state.newProduct = newProduct
            }

        },
        [onAddRetail.type]: (state, {payload: editedProduct}) => {
            if (editedProduct === null) {
                return state
            } else {
                state.editedProduct = editedProduct
            }
        }

     }
)    

export default {materials, sales, products}