import {getLoggedUser} from "../frameworks/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

export const CheckUser = (dispatch) => async(
    user
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   
      const response = await fetch(`${url}login/isUserAuth`, {
         method: "GET",
         headers: {
            "x-access-token": localStorage.getItem("token"),
         },
      })
      //need to await on parsing response to javascript objects from json
      const success = await response.json()

      //pass into our action as a payload and we dispatch it
      if (!success.user){
         success.user = {}
      }
      
      return dispatch(getLoggedUser(success))
}

export default CheckUser