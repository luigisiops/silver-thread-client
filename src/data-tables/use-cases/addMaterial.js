
import {onAddMaterial} from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

// This is a usecase for getting the list of materials
export const AddMaterial = (dispatch) => async(
    fields,
) => {    
    const newMaterial = fields
    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`${url}materials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial)
    })
    //need to await on parsing response to javascript objects from json
    const materialsList = await response.json()

    //pass into our action as a payload and we dispatch it
    return dispatch(onAddMaterial(materialsList))
}


export default AddMaterial