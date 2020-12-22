import { onAddSale } from "../framework/actions"
import { Popover } from '@material-ui/core';

//This is a usecase for getting the list of sales
export const AddSale = (dispatch) => async (fields) => {
   const newSale = {
      product_number: fields.product_number,
      product_name: fields.product_name,
      product_category: fields.product_category,
      price_per_unit: fields.price_per_unit,
      quantity: fields.quantity,
      total_price: fields.total_price,
      sold_to: fields.sold_to,
   }
   console.log("NEW SALE UNDER THIS")
   console.log(newSale)

   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   try {
      const response = await fetch(`http://localhost:8000/sales/addNewSale`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newSale),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      console.log(success)

      //pass into our action as a payload and we dispatch it
      return dispatch(onAddSale(success))
   } catch (e) {
      console.log("CAUGHT ERROR IN PROMISE")
   }
}

export default AddSale
