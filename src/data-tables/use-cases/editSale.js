import {onEditSale} from "../framework/actions"

//This is a usecase for getting the list of sales
export const EditSale = (dispatch) => async(
    saleEdits,
) => {

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`http://localhost:8000/sales/${saleEdits.id}/updateASale`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleEdits)
    })
    //need to await on parsing response to javascript objects from json
    const success = await response.json()
    
    //pass into our action as a payload and we dispatch it
    return dispatch(onEditSale(success))
}

export default EditSale