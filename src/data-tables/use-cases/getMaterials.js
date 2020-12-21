import {onGetMaterials} from "../framework/actions"


//This is a usecase for getting the list of materials
export const GetMaterials = (dispatch) => async(
    materials,
) => {

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`http://localhost:8000/materials`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    //need to await on parsing response to javascript objects from json
    const materialsList = await response.json()

    //pass into our action as a payload and we dispatch it
    return dispatch(onGetMaterials(materialsList))
}


export default GetMaterials