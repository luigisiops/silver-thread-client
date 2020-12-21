import { combineReducers, createStore } from "redux"
import { configureStore } from '@reduxjs/toolkit'

const reducers = {
//need to set it
}

const rootReducer = combineReducers(reducers)

const store = configureStore({
    reducer: reducers,
})

export default store