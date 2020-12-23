import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
    onAddMaterial,
    onDeleteMaterial,
    onGetSales,
    onDeleteSale,
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

        [onAddMaterial.type]: (state,{payload: material}) => {
            if (material === null){
                return state
            } 
            state.materialsList = [...state.materialsList, material]
        }, 

        [onDeleteMaterial.type]:(state, {payload: materialid}) => {
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
       saleID: '' 
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
                return state
            }
            state.saleID = saleid
            
        }
    }
)

export default {materials, sales}