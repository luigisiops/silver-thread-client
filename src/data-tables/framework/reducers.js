import { createReducer } from "@reduxjs/toolkit"

import {
    onGetMaterials,
}from "./actions"

export const materials = createReducer(
    {
        byId: {}
    },
    {
        [onGetMaterials.type]: (state, {payload: material}) => {
            if (material === null){
                return state
            }
            state.byId[material.id] = material
        },
    }
)