var express = require('express');
var app = express();
var pool = require("../TrelloAPI/server/db");
const nodemailer = require('nodemailer');

function UUID() {
    return //16 character hexadecimal string//
}

app.post ("/user",(req,res)=>
{
    const lemail = req.body.lemail
    const lpassword = req.body.lpassword
})

const onSuccess = ({data}) => {
    setClientToken(data.token);
    this.ListeningStateChangedEvent({isLoading: false, isAuthorized: true});
};

const onFailure = error => {
    console.warn(error && error.response);
    this.ListeningStateChangedEvent({errors: error.response.data, isLoading: false});
};

