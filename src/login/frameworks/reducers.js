import { createReducer } from "@reduxjs/toolkit"

import {
    onLogin,
    getLoggedUser,
    onUserSignout
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
        },

        [onUserSignout.type]: (state) => {
            state.currentUser = {}
        },
    }
)

export default {login}