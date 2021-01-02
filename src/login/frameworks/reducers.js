import { createReducer } from "@reduxjs/toolkit"

import {
    onLogin,
    getLoggedUser
} from "./actions"

export const login = createReducer (
    {
        currentUser: {}
    },
    {
        [onLogin.type]: (state, {payload: user}) => {
            if (user === null) {
                return state
            }
            state.currentUser = user
        },

        [getLoggedUser.type]: (state, {payload: user}) => {
            if (user === null) {
                return state
            }
            state.currentUser = user
        }
    }
)

export default {login}