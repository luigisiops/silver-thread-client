import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';

import ST_1 from '../images/ST_1.png';
import ST_2 from '../images/ST_2.jpg';
import ST_3 from '../images/ST_3.jpg';
import ST_4 from '../images/ST_4.jpg';
import ST_5 from '../images/ST_5.jpg';
import ST_6 from '../images/ST_6.jpg';
import ST_7 from '../images/ST_7.jpg';
import ST_8 from '../images/ST_8.jpg';
import ST_9 from '../images/ST_9.jpg';
import ST_10 from '../images/ST_10.jpg';
import ST_11 from '../images/ST_11.jpg';
import ST_12 from '../images/ST_12.jpg';
import ST_13 from '../images/ST_13.jpg';
import ST_14 from '../images/ST_14.jpg';



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
      width: 800,
    //   height: 900,
    },
  }));

const tileData = [
   {
     img: ST_3,
     title: 'Image1',
     author: 'SilverThreadDesigns',
     cols: 1,
   },
   {
    img: ST_4,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_5,
    title: 'Image3',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_6,
    title: 'Image3',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_7,
    title: 'Image2',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_8,
    title: 'Image3',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_9,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_11,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_12,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_13,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_14,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
   {
    img: ST_10,
    title: 'Image4',
    author: 'SilverThreadDesigns',
    cols: 1,
   },
];

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
                <GridList cellHeight={290} cellWidth={300} className={classes.gridList} cols={4}>
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

