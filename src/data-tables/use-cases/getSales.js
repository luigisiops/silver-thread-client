import {onGetSales} from "../framework/actions"

//This is a usecase for getting the list of sales
export const GetSales = (dispatch) => async(
    sales,    
) => {    
    // first we call a fetch request to update our backend because the backend is the source of truth for our global state
    const response = await fetch(`http://localhost:8000/sales/getAllSales/${sales.start}/${sales.end}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
    
    //need to await on parsing response to javascript objects from json
    const salesList = await response.json()
    
    //pass into our action as a payload and we dispatch it
    return dispatch(onGetSales(salesList))
}


export default GetSales