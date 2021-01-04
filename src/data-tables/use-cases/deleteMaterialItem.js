import {onDeleteMaterialItem} from "../framework/actions"

export const DeleteMaterialItem = (dispatch) => async(
    materialID,
) => {
    
    const response = await fetch(`http://localhost:8000/materialByProdNums/delete/${materialID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },     
    })
   
    const success = await response.json()
   
    return dispatch(onDeleteMaterialItem(success))
}


export default DeleteMaterialItem