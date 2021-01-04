import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { CheckUser } from '../use-cases/CheckUser'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1500,
    },
    pita: {
        minWidth: 275,
    }
  }));


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
            <div className={classes.root} style={{ background: 'transparent'}} elevation={0}>
                <GridList cellHeight={350} cellWidth={400} className={classes.gridList} cols={4}>
                    {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                    ))}
                </GridList>
            </div>
            {/* <div className="left-container">
                <h2 className="blurb">A Data Managment User Interface for Silver Thread Designs</h2>
                <h2 className="blurb">Handle your business logic via linked tables and graphical interfaces</h2>
            </div> */}

            {/* <Card className={classes.pita}>
            <CardContent> */}
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
            {/* </CardContent>
            </Card> */}
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

