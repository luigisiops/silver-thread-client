import { onGetProductByID } from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'


export const GetProductByID = (dispatch) => async (
    productID,
) => {

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`${url}edit-product/${productID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    //need to await on parsing response to javascript objects from json
    const productListing = await response.json()

    //pass into our action as a payload and we dispatch it
    return dispatch(onGetProductByID(productListing))

}


export default GetProductByID