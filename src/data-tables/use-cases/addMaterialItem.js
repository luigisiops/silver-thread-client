import {onAddNewMaterial} from "../framework/actions"

export const AddNewMaterial = (dispatch) => async(
    newMaterial,
) => {        
    const response = await fetch(`http://localhost:8000/materialByProdNums/add-material`, {
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