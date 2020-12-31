import { onLogin } from "../frameworks/actions"

export const UserLogin = (dispatch) => async(
    user
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   
      const response = await fetch(`http://localhost:8000/materials`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      console.log(success)

      //pass into our action as a payload and we dispatch it
      return dispatch(onLogin(success))
}

export default UserLogin