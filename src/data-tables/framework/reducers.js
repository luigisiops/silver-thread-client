import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onGetSales,
    onDeleteSale,
    onEditSale,
}from "./actions"

export const materials = createReducer(
    {
        materialsList: [],
        materialID: ''
    },
    {
        [onGetMaterials.type]: (state, {payload: material}) => {
            if (material === null){
                return state
            }
            state.materialsList = material
        },
        [onDeleteSale.type]:(state, {payload: materialid}) => {
            if (materialid === null) {
                return state
            }
            console.log(materialid)
            state.materialID = materialid
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
        [onGetSales.type]: (state, {payload: sales}) => {
            if (sales === null) {
                return state
            } 
            state.salesList = sales
        },
        [onDeleteSale.type]: (state, {payload: saleid}) => {            
            if (saleid === null) {
                return state
            }
            state.saleID = saleid
            
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