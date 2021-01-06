import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';


import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { UserRegister } from '../use-cases/UserRegister'


import logo from '../images/logo.png'

const useStyles = makeStyles((theme) => ({
      media: {
        height: 300,
      },
      image: {
          borderRadius: 16,
          borderColor: '#5f5f5f',
          borderWidth: 0.001,
      },
  }));

const ForgotPassword = ({onRegister}) => {

    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }

    const classes = useStyles();

    return (
        <div className="login-component">
            <div className="left-container">
                <img className={classes.image} src={logo} alt="logo" height="150" border="3pt dashed red"/>
                <h2 className="blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className="blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div>

            <div className="register-container">
                <h2 className = "login-blurb">Reset Your Password</h2>
                <div className="login-box">
                    <div className="login-input"><TextField id="outlined-basic" label="First Name" variant="outlined" name = "firstname" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Last Name" variant="outlined" name = "lastname" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Username" variant="outlined" name = "username" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Password" variant="outlined" name = "password" type = "password" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Email" variant="outlined" name = "email" type = "email" onChange = {setField}/></div>
                    <div className = "button-container">
                        <NavLink to= "/login">
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)