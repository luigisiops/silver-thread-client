import { onUserSignout } from "../frameworks/actions"

export const UserSignout = (dispatch) => async(
) => {
   //first get the current user id from the current token
   // then remove that user from the local storage and redirect
      localStorage.removeItem("token")

      //pass into our action as a payload and we dispatch it
      return dispatch(onUserSignout())
}

export default UserSignout