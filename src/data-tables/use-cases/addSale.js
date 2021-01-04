import { onAddSale } from "../framework/actions"
import { Popover } from '@material-ui/core';

//This is a usecase for getting the list of sales
export const AddSale = (dispatch) => async (fields) => {
   
   // const newSale = {
   //    product_id: fields.productDetails.id,      
   //    product_number: fields.productDetails.product_num,
   //    product_name: fields.productDetails.product_name,
   //    product_category: fields.productDetails.category,
   //    price_per_unit: fields.productDetails.retail_price,
   //    quantity: fields.quantity,
   //    total_price: fields.total_price,
   //    sold_to: fields.sold_to,
   //    date_sold: fields.date_sold,
   //    shipping: fields.shipping,
   //    tax: fields.tax,
   //    discount_rate: fields.discount
   // }
   

   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   try {
      // console.log(newSale)
      const response = await fetch(`http://localhost:8000/sales/addNewSale`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(fields),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      // console.log(success)

      //pass into our action as a payload and we dispatch it
      return dispatch(onAddSale(success))
   } catch (e) {
      console.log("CAUGHT ERROR IN PROMISE")
   }
}

export default AddSale
