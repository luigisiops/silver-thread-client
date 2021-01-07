import {onDeleteMaterialItem} from "../framework/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

export const DeleteMaterialItem = (dispatch) => async(
    materialID,
) => {
    
    const response = await fetch(`${url}materialByProdNums/delete/${materialID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },     
    })
   
    const success = await response.json()
   
    return dispatch(onDeleteMaterialItem(success))
}


export default DeleteMaterialItem