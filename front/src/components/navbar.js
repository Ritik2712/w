import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/EnRlogo.png";
import { connect } from 'react-redux'
import {addUser} from '../store/actions/actionConstants'

function Navbar({login, dispatch}) {

  function handleSignOut(e){
    dispatch(addUser(false, '', '', [],''))
  }

  
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
          <div className="image">
              {/* <img alt="EnRlogo" src={logo} height='auto' width='10%'></img> */}
            </div>
            <Link className="navbar-brand" to={"/"}>
              WMS
            </Link>
            {!login ? 
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>: 
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-link" onClick={handleSignOut}>
                  Sign Out
              </li>
              <li className="nav-item" style={{paddingLeft:10}}>
                  <Link to="/task" className="nav-link">Boards</Link>
              </li>
            </ul>
            </div>}
          </div>
        </nav>
    )
}

const mapStateToProps = (state)=>{
  return{
    login: state.user.login
  }
}
export default connect(mapStateToProps)(Navbar)
