import React, { useState } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import Axios from "axios";
import _ from 'lodash'

import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";

import {addUser} from '../store/actions/actionConstants'
import signin from "../images/signin.jpg" 

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


function Login({login, dispatch}) {
  // const { history } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () =>{
    setValues({...values, showPassword: !values.showPassword});
  };

  const submitHandler = (e) => {
    e.preventDefault();


    if(email===""){

     alert("email is required")
    }

    Axios.post("/api/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.userId){
        dispatch(addUser(true, response.data.userId, response.data.username, response.data.boardId,response.data.token))
      }else{
        console.log(response.data.msg)
        const status = response.data.status
          if(status){
            if(status === 'email'){
              setEmail("")
            }
          }
        alert(response.data.msg)
        //Display msg for an error
      }
    });
    // if(lemail==="A" &&  lpassword==="B"){
    //   setlogin(true)
    // }
    
   
    

  };

  if(login){
    return(
      <Redirect to='/task'/>
    )
  }

return (
  <div className="outer">
    <Grid container>
      <Grid className="backside" item md={6} xs={12}>
        <img src={signin} height='50%' width='80%' alt="Signup" />
        </Grid> 
        <Grid item sm={6} xs={12} style={{ background: "#ffffff", padding: "50px", marginTop: "70px" }}>
          <div>
            <h1 className="sign-up-hd">User Login !</h1>
            <div className="sign-grp">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type={values.showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <span
                className="password-icon"
                onClick={handleClickShowPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>
            <div className="btn-place">
              <button
                type="submit"
                onClick={submitHandler}
                className="sign-up-btn"
              >
                Login
              </button>
            </div>
            <div>
              <h6 className="existing">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  style={{ textDecoration: "none", color: "#7D81DA" }}
                >
                  Sign-Up
                </Link>{" "}
              </h6>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )  
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
  return {
    login : state.user.login
  }
}
export default connect(mapStateToProps)(Login);

