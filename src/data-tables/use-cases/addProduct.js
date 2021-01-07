import { onAddProduct } from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'


export const AddProduct = (dispatch) => async (
    newProduct
) => {
    const response = await fetch(`${url}products`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct)
    })   

    //need to await on parsing response to javascript objects from json
    const result = await response.json()

    //double check what false result is
    if (result == null) {
        alert("There was an error creating your product")
    } else {
        //pass into our action as a payload and we dispatch it
        return dispatch(onAddProduct(result.savedProduct))

    }
    

    

}

export default AddProduct
