import {getLoggedUser} from "../frameworks/actions"

export const CheckUser = (dispatch) => async(
    user
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   
      const response = await fetch(`http://localhost:8000/login/isUserAuth`, {
         method: "GET",
         headers: {
            "x-access-token": localStorage.getItem("token"),
         },
      })
      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      console.log(JSON.stringify(success))

      //pass into our action as a payload and we dispatch it
      if (!success.user){
         success.user = {}
      }
      
      return dispatch(getLoggedUser(success))
}

export default CheckUser