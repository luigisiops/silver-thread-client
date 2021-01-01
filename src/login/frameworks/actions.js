import { createAction } from "@reduxjs/toolkit"

export const onLogin = createAction("login.user")
export const getLoggedUser = createAction("get.logged.user")
export const addUser = createAction("add.user")