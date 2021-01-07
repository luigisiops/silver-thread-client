import { onLogin } from "../frameworks/actions"

const url = 'https://safe-wildwood-02569.herokuapp.com/'

export const SendEmail = async (email) => {
   // first we call a fetch request to update our backend because the backend is the source of truth for our global state
      const response = await fetch(`${url}password-reset/`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(email),
      })

        const success = await response.json()
        console.log(response)

      //pass into our action as a payload and we dispatch it
      return 
}

export default SendEmail