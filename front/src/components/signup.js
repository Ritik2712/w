import React, { useState } from "react";
import { connect } from 'react-redux'
import {  Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Grid } from "@material-ui/core";
import signup from "../images/signupimage.jpg"
import {addUser} from '../store/actions/actionConstants';

function SignUp({ login, dispatch }) {
  const [email, setEmail] = useState("");
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  // const [isSignup, setisSignup] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm password are different");
      return
    }
    if (password.length < 6) {
      alert("Password should be atleast 6 characters");
      return
    }
    if (!user || !email || !password || !confirmPassword) {
      alert("Please enter all fieds");
      return
    }
    axios.post('/api/newUser', {email:email, username:user, password:password,fName,lName})
      .then((response) => {
        if(response.data.msg){
          const status = response.data.status
          if(status){
            if(status === 'email'){
              setEmail("")
            }else if(status === "user"){
              setuser("")
            }
          }
          alert(response.data.msg)

        }else{
          dispatch(addUser(true, response.data.userId, response.data.username, response.data.boardId,response.data.token))
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  if(login){
    return <Redirect to="/upload-img" />
  }

  return (
    <div className="outer">
      <Grid container>
        <Grid item sm={6} xs={12} style={{ background: "#ffffff"}} >
          <img src={signup} height='50%' width='70%' alt="Sign-up" />
        </Grid>
        <Grid item sm={6} xs={12} style={{ background: "#ffffff", padding: "50px" }}>
          <div>
            <h1 className="sign-up-hd">Sign Up !</h1>
            <div className="sign-grp">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setuser(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-grp">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            <div className="btn-place">
              <button
                type="submit"
                onClick={submitHandler}
                className="sign-up-btn"
              >
                Sign Up
              </button>
            </div>
            <div>
              <h6 className="existing">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  style={{ textDecoration: "none", color: "#7D81DA" }}
                >
                  LogIn
                </Link>{" "}
              </h6>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    login: state.user.login
  }
}

export default connect(mapStateToProps)(SignUp);
