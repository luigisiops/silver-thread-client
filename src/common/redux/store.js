import { combineReducers, createStore } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import materials from "../../data-tables/framework/reducers"
import sales from "../../data-tables/framework/reducers"

const reducers = {
    ...materials,
    ...sales,

}

const store = configureStore({
    reducer: reducers,
})

export default store