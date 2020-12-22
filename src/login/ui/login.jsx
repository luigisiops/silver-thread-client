import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';

import "./login.css"

const Login = () => {

    return(
        <div className = "login-component">
            <div className="left-container">
                <h2 className = "blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className = "blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div>

            <div className= "login-container">
                <div className = "login-box">
                <h2>See Your Business Data Now</h2>
                    <div className= "login-input"><TextField id="outlined-basic" label="Username" variant="outlined" /></div>
                    <div className= "login-input"><TextField id="outlined-basic" label="Password" variant="outlined" /></div>
                </div>
            </div>
        </div>
    )
} 

export default Login