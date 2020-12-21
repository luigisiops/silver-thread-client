import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onGetSales,
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
       salesList: [] 
    }, 
    {
        [onGetSales.type]: (state, {payload: sales}) => {
            if (sales === null) {
                return state
            } 
            state.salesList = sales
        }
    }
)

export default {materials, sales}