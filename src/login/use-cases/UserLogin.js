import { onLogin } from "../frameworks/actions"

export const UserLogin = (dispatch) => async(
    user
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
      const response = await fetch(`http://localhost:8000/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      
      if (success.auth === true) {
         const localUser = {
            auth: success.auth, 
            token: success.token, 
            userId: success.user.id, 
            username: success.user.username, 
            firstname: success.user.first_name, 
            lastname: success.user.last_name
           }
  
        localStorage.setItem("token", success.token)
        console.log(localUser)
  
        //pass into our action as a payload and we dispatch it
        return dispatch(onLogin(localUser))
      }
      else {
         return dispatch(onLogin(success))
      }

   }
      

export default UserLogin