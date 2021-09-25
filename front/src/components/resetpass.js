import React, { useState} from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";

export function ResetPass() {
    
    const [lemail, setlEmail] = useState("");

    const validateForm = () => {
        return lemail.length > 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    axios.post('resetpass',{
        email: lemail
    }).then(
        res => {
            console.log(res)
        }
    ).catch(
        err => {
            console.log(err);
        }
    )

    return (
        <div className="outer">
        <div className="inner">
        <form>
            <h3>Forgot Password?</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" value={lemail}
            onChange={(e) => setlEmail(e.target.value)} className="form-control" placeholder="Enter email" />
            </div>
        <div className="button">
        <button type="submit" bsSize="small" disabled={!validateForm()} onClick={submitHandler} className="btn btn-dark btn-lg btn-block"><Link to='/sign-in'>Reset</Link></button>
        </div>   
        </form>
        </div>
        </div>
    );
}
