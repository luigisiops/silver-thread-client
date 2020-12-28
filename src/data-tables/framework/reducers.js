import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onAddMaterial,
    onDeleteMaterial,
<<<<<<< HEAD
    onEditMaterial,
=======
>>>>>>> 7ac17c0e3258a410dce2693aadbbd142bca3a3a5
    onGetSales,
    onDeleteSale,
    onAddSale,
    onEditSale,
    onGetProducts,
    onDeleteProduct,
   
}from "./actions"

export const materials = createReducer(
    {
        materialsList: [],
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
        },
<<<<<<< HEAD
        [onDeleteMaterial.type]: (state, {payload: materialid}) => {
            if (materialid === null) {               
=======

        [onAddMaterial.type]: (state,{payload: material}) => {
            if (material === null){
                return state
            } 
            state.materialsList = [...state.materialsList, material]
        }, 

        [onDeleteMaterial.type]:(state, {payload: materialid}) => {
            if (materialid === null) {
>>>>>>> 7ac17c0e3258a410dce2693aadbbd142bca3a3a5
                return state
            }
            state.materialID = materialid
        },
        [onAddMaterial.type]: (state, {payload: materialDetails }) => {
            if (materialDetails === null) {
                return state
            }
            state.materialAdd = materialDetails
        },
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
       saleID: '',      
       saleEdits: {} 
    }, 
    {
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
        productsDelete: '',
        productsAdd: '',
        productsEdit: '',
     }, 
     {
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
            console.log(productid)
            state.productsDelete = productid
        },

     }
)    

export default {materials, sales, products}