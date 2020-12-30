import { combineReducers, createStore } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import materials from "../../data-tables/framework/reducers"
import sales from "../../data-tables/framework/reducers"
import products from "../../data-tables/framework/reducers"
import login from "../../login/frameworks/reducers"

const reducers = {
    ...materials,
    ...sales,
    ...products,
    ...login,

}

const store = configureStore({
    reducer: reducers,
})

export default store