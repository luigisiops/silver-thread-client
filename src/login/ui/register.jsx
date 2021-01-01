import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"



import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { UserRegister } from '../use-cases/UserRegister'

const Register = ({onRegister}) => {

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
                <h2 className = "login-blurb">Register Here</h2>
                <div className="login-box">
                    <div className="login-input"><TextField id="outlined-basic" label="First Name" variant="outlined" name = "firstname" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Last Name" variant="outlined" name = "lastname" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Username" variant="outlined" name = "username" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Password" variant="outlined" name = "password" type = "password" onChange = {setField}/></div>
                    <div className = "button-container">
                        <NavLink to= "/">
                            <Button className ="login-button" variant="outlined" onClick = {() => {onRegister(fields)}}>Login</Button>
                        </NavLink>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, {materials}) => ({
    user: state.login.currentUser,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    onRegister: UserRegister(dispatch)
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(Register)

