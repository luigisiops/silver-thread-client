import { createReducer } from "@reduxjs/toolkit"

import {
    onLogin
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
    }
)

export default {login}