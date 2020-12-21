import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
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

export default {materials}