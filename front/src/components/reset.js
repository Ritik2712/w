import React, {useState} from "react";
import { useHistory,Link, Redirect } from "react-router-dom";
import axios from "axios";

export function Reset(){
    const [lpassword, setlPassword] = useState("");
    const [lpassword_config, setlPassword_config] = useState("");

    const state ={};


    const submitHandler = (e) => {
        e.preventDefault();
    };

    axios.post('reset',{
        password: lpassword,
        password_config: lpassword_config
    }).then(
        res => {
            console.log(res);
            this.setState({
                reset: true
            });
        }
    ).catch(
        err =>{
            console.log(err);
        }
    )
    

    return ( 
        <div className="outer">
        <div className="inner">
        <form>
            <h3>Reset Password</h3>

            <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={lpassword}
                onChange={(e) => setlPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                <br></br>
                </div>

                <div className="form-group">
                    <label>Re-enter Password</label>
                    <input type="password" value={lpassword_config}
                onChange={(e) => setlPassword_config(e.target.value)} className="form-control" placeholder="Re-Enter password" />
                </div>

        <div className="button">
        <button type="submit" bsSize="small" onClick={submitHandler} className="btn btn-dark btn-lg btn-block"><Link to='/sign-in'>Submit</Link></button>
        </div> 

        </form>
        </div>
        </div>
    );
}