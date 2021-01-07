import { onLogin } from "../frameworks/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

export const ResetPassword = (dispatch) => async(
    fields
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
      const user = await fetch(`${url}password-reset/update-password`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(fields),
      })
      const data = await user.json()

      const loginInfo = {
         username: data.username,
         password: fields.password
      }
      //need to await on parsing response to javascript objects from json
      const response = await fetch(`${url}login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(loginInfo),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()

      localStorage.setItem("token", success.token)

      //pass into our action as a payload and we dispatch it
      return dispatch(onLogin(success))
}

export default ResetPassword