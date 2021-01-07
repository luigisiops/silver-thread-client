import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container, AppBar, Grid, Card, CardMedia, ThemeProvider, CssBaseline } from '@material-ui/core';
import LeagueSparatanBoldWoff2 from '../../fonts/leaguespartan-bold-webfont.woff2'

import "./login.css"
import { onLogin } from '../frameworks/actions';
import { UserLogin } from '../use-cases/UserLogin'
import { CheckUser } from '../use-cases/CheckUser'

import logo from '../images/logo.png'
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

const league_spartanbold = {
    fontFamily: 'League Spartan',
    fontStyle: 'bold',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('League-Spartan'),
      local('League-Spartan-Bold'),
      url(${LeagueSparatanBoldWoff2}) format('woff2')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      appBar: {
        borderRadius: 15,
        marginTop: '5px',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#5f5f5f',
      },
      media: {
        height: 300,
      },
      card: {
        maxHeight: 1000,
        maxWidth: 400,
      },
      image: {
          borderRadius: 16,
      },
      big: {
          backgroundColor: '#4db6ac',
      },
      typography: {
        fontFamily: 'League-Spartan, Bold',
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [league_spartanbold],
          },
        },
      },
  }));


const Login = ({onLogin, getLoggedUser, user}) => {

    const [fields, setFields] = useState({})
    const [loginVal, setLoginVal] = useState(false)

    const setField = (evt) => {
        setFields({
            ...fields,
            [evt.target.name]: evt.target.value
        })
    }

    useEffect(() => {
        getLoggedUser()
    },[])

    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setLoginVal(false)
    };
    const onHandleLoginValidation = () => {
      if(user.auth === false){
        setLoginVal(true)        
      }
    }

    const theme = {

    };

    return (
        <CssBaseline>
        <ThemeProvider theme={theme}>
            <Container className={classes.big} maxWidth="xlg" flexDirection="column">
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                    <img className={classes.image} src={logo} alt="logo" height="60" />
                    <Button color="inherit" onClick={handleOpen}>Login</Button>
                    </Toolbar>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                            >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <div className="login-container">
                                        <h2 className = "login-blurb">Silverthread Designs</h2>
                                        <div className="login-box">
                                            <div className="login-input"><TextField id="outlined-basic" label="Username" variant="outlined" name = "username" onChange = {setField}/></div>
                                            <div className="login-input"><TextField id="outlined-basic" label="Password" variant="outlined" type = "password" name = "password" onChange = {setField}/></div>
                                            {loginVal === true ?
                                              <div className = "login-error">{user.message}</div>
                                              :
                                              <div></div>
                                            }
                                            <div>Not a user? <NavLink to="/register"> Register</NavLink> and get permission from a moderator!</div>
                                            <div>Forgot password? Click <NavLink to="/password-reset/email"> Forgot Password</NavLink> to reset your password!</div>
                                            <div className = "button-container">
                                            <Button onClick = {()=>
                                              {
                                              onHandleLoginValidation()
                                              onLogin(fields)}} className ="login-button"variant="outlined">Login</Button>
                                            {user.auth === true ? <Redirect to="/"/> : <div></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </AppBar>
                 <Grid container flexGrow={1} justify="space-between" alignItems="center" spacing={3} justify="center" flexDirection="row">
                     <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_3}
                                title="Drop Earrings"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_4}
                                title="Reticulated Silver Bracelet"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_5}
                                title="Drop Ring"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_6}
                                title="Drop Ring"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_7}
                                title="Drop Necklace"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_8}
                                title="Drop Bracelet"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_9}
                                title="Mezuzah"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_10}
                                title="Drop Earrings"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_11}
                                title="Drop Earrings"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_12}
                                title="Drop Necklace"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_13}
                                title="Mezuzah"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.media}
                                image={ST_14}
                                title="Reticulated Silver Earrings"
                                />
                            </Card>
                        </Grid>
                 </Grid>
        </Container>
        </ThemeProvider>
        </CssBaseline>
    )
}

const mapStateToProps = (state, { materials }) => ({
  user: state.login.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: UserLogin(dispatch),
  getLoggedUser: CheckUser(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
