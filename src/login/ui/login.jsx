import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';


import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { CheckUser } from '../use-cases/CheckUser'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));
  
  /**
   * The example data is structured as follows:
   *
   * import image from 'path/to/image.jpg';
   * [etc...]
   *
   * const tileData = [
   *   {
   *     img: image,
   *     title: 'Image',
   *     author: 'author',
   *     cols: 2,
   *   },
   *   {
   *     [etc...]
   *   },
   * ];
   */

const Login = ({onLogin, getLoggedUser, user}) => {

    const [fields, setFields] = useState({})

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }

    useEffect(() => {
        getLoggedUser()
    },[])
    console.log(fields)

    const classes = useStyles();


    return (
        <div className="login-component">
            <div className="left-container">
                <h2 className="blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className="blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div>

            <div className="login-container">
                <h2 className = "login-blurb">See Your Business Data Now</h2>
                <div className="login-box">
                    <div className="login-input"><TextField id="outlined-basic" label="Username" variant="outlined" name = "username" onChange = {setField}/></div>
                    <div className="login-input"><TextField id="outlined-basic" label="Password" variant="outlined" type = "password" name = "password" onChange = {setField}/></div>
                    <div>Not a user? <NavLink to="/register"> Register</NavLink> and get permission from a moderator!</div>
                    <div className = "button-container">
                       <Button onClick = {()=>onLogin(fields)}className ="login-button"variant="outlined">Login</Button>
                       {Object.keys(user).length>0 ? <Redirect to="/"/> : <div></div>}
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
    onLogin: UserLogin(dispatch),
    getLoggedUser: CheckUser(dispatch)

  })
  
export default connect(mapStateToProps, mapDispatchToProps)(Login)

