import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onGetSales,
    onDeleteSale,
}from "./actions"

export const materials = createReducer(
    {
        materialsList: []
    },
    {
        [onGetMaterials.type]: (state, {payload: material}) => {
            if (material === null){
                return state
            }
            state.materialsList = material
        },
    }
)

export const sales = createReducer(
    {
       salesList: [],
       saleID: '' 
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
            
        }
    }
)

export default {materials, sales}