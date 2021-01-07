import React, { Component } from 'react'
import { connect } from 'react-redux'
// higher order components 
export default function(ComposedComponent) {

    class Authenticate extends Component {

        constructor(props) {
            super(props)

            // if the user is NOT authenticated then 
            let token = localStorage.getItem('token')
            if(!this.props.isAuthenticated && !token) {
                // send the user to the login component
                this.props.history.push('/login')
            } 
        }

        render() {
            return <ComposedComponent {...this.props} />
        }

    }

    const mapStateToProps = (state,) => ({
        isAuthenticated: state.login.currentUser.auth
      });

    return connect(mapStateToProps,null)(Authenticate)

}


  
  
  