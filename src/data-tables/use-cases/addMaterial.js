<<<<<<< HEAD
import { onAddMaterial } from "../framework/actions"

export const AddMaterial = (dispatch) => async(
    materialAdd
) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   try {
      const response = await fetch(`http://localhost:8000/materials`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(materialAdd),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      console.log(success)

      //pass into our action as a payload and we dispatch it
      return dispatch(onAddMaterial(success))
   } catch (e) {
      console.log("CAUGHT ERROR IN PROMISE")
   }
}

=======
import {onAddMaterial} from "../framework/actions"


//This is a usecase for getting the list of materials
export const AddMaterial = (dispatch) => async(
    fields,
) => {
    console.log(fields)
    const newMaterial = fields

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    /*const response = await fetch(`http://localhost:8000/materials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial)
    })
    //need to await on parsing response to javascript objects from json
    const materialsList = await response.json()*/

    //pass into our action as a payload and we dispatch it
    return dispatch(onAddMaterial(fields))
}


>>>>>>> 7ac17c0e3258a410dce2693aadbbd142bca3a3a5
export default AddMaterial