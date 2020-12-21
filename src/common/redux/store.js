import { combineReducers, createStore } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import materials from "../../data-tables/framework/reducers"

const reducers = {
    ...materials
}

const store = configureStore({
    reducer: reducers,
})

export default store