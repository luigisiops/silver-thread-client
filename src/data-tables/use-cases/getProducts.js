import {onGetProducts} from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'


//This is a usecase for getting the list of materials
export const GetProducts = (dispatch) => async(
   products,
) => {

    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`${url}products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    //need to await on parsing response to javascript objects from json
    const productsList = await response.json()

    //pass into our action as a payload and we dispatch it
    return dispatch(onGetProducts(productsList))
}


export default GetProducts