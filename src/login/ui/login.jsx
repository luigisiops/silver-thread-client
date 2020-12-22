import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import "./login.css"

const Login = () => {

    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }
    console.log(fields)
    return (
        <div className="login-component">
            <div className="left-container">
                <h2 className="blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className="blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div>

            <div className="login-container">
                <h2 className = "login-blurb">See Your Business Data Now</h2>
                <div className="login-box">
                    <div className="login-input"><TextField id="outlined-basic" label="Username" variant="outlined" name = "name" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Password" variant="outlined" name = "password" onChange = {setField}/></div>
                    <div className = "button-container">
                        <Button className ="login-button"variant="outlined">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login