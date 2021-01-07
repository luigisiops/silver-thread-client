import {onDeleteProduct} from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'


//This is a usecase for getting the list of sales
export const DeleteProduct = (dispatch) => async(
    productsDelete,
) => {

     // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`${url}delete-product`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: productsDelete})
    })
   
    //need to await on parsing response to javascript objects from json
    const success = await response.json()
   
    //pass into our action as a payload and we dispatch it
     return dispatch(onDeleteProduct(success))
}


export default DeleteProduct