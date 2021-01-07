import {onAddNewMaterial} from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

export const AddNewMaterial = (dispatch) => async(
    newMaterial,
) => {        
    const response = await fetch(`${url}materialByProdNums/add-material`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial)
    })
   
    const materialDetails = await response.json()

    return dispatch(onAddNewMaterial(materialDetails))
}


export default AddNewMaterial