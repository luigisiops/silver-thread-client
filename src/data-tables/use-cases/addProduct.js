import { onAddProduct } from "../framework/actions"
import { Popover } from '@material-ui/core';

//This is a usecase for getting the list of sales
export const AddProduct = (dispatch) => async (fields) => {
   const newProduct = {
     /*  product_id: product_id 
     ^ gets product id from a fetch call to the products table route*/
      product_name: fields.product_name,
      labor: fields.labor,
      wholesale: fields.wholesale,
      retail_price: fields.retail_price,
      quantity: fields.quantity,
      category: fields.category,
   }

   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
   try {
      const response = await fetch(`http://localhost:8000/sales/products`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newProduct),
      })

      //need to await on parsing response to javascript objects from json
      const success = await response.json()
      console.log(success)

      //pass into our action as a payload and we dispatch it
      return dispatch(onAddProduct(success))
   } catch (e) {
      console.log("CAUGHT ERROR IN PROMISE")
   }
}

export default AddProduct
