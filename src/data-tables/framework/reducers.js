import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onAddMaterial,
    onGetSales,
    onDeleteSale,
    onAddSale,
    onEditSale,
    onDeleteMaterial,
}from "./actions"

export const materials = createReducer(
    {
        materialsList: [],
        materialID: '',
        materialAdd: '',
    },
    {
        [onGetMaterials.type]: (state, {payload: material}) => {
            if (material === null){
                return state
            }
            state.materialsList = material
        },
        [onDeleteMaterial.type]: (state, {payload: materialid}) => {
            if (materialid === null) {
                console.log('null')
                return state
            }
            console.log(materialid)
            state.materialID = materialid
        },
        [onAddMaterial.type]: (state, {payload: materialDetails }) => {
            if (materialDetails === null) {
                return state
            }
            state.materialAdd = materialDetails
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

export default {materials, sales}