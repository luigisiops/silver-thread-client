import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';


import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { CheckUser } from '../use-cases/CheckUser'
import {ResetPassword} from '../use-cases/ForgotPassword'
import SendEmail from '../use-cases/SendEmail'


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

const ForgotPasswordEmail = ({onLogin, getLoggedUser, user, onResetPassword}) => {
    const userId = parseInt(useParams().userId)
    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }
    console.log(fields)

    const classes = useStyles();

    return (
        <div className="login-component">
            <div className="left-container">
                <img className={classes.image} src={logo} alt="logo" height="150" border="3pt dashed red"/>
                <h2 className="blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className="blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div>

            <div className="register-container">
                <h2 className = "login-blurb">Provide your account email to receive a password reset link!</h2>
                <div className="login-box">
                  
                    <div className="login-input"><TextField id="outlined-basic" label="email" variant="outlined" name = "email" type = "email" onChange = {setField} required/></div>
                    <div className = "button-container-email">
                        <NavLink to= "/">
                            <Button className ="login-button" variant="outlined" onClick = {() => {SendEmail(fields)}}>Send</Button>
                        </NavLink>
                        <div><NavLink to="/login"> Return to Login Page</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.login.currentUser,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    onLogin: UserLogin(dispatch),
    onResetPassword: ResetPassword(dispatch),
    getLoggedUser: CheckUser(dispatch),
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordEmail)