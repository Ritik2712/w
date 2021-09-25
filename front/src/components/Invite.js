import React, {useState} from 'react'
import axios from 'axios'
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const Forms = styled(FormControl)`
    flex-direction: row;
`;
export default function Invite({boardId}) {
    const [email, setEmail] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email.includes("@")){
            // call api to send mail 
            axios.put("/api/acessRights", {email, boardId})
            .then((res)=>{
                alert(res.data.msg)
                setEmail("")
            })
        }else{
            alert("Wrong Email Address")
        }
    }
    const handleChange = (e)=>{
        setEmail(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Forms variant="outlined" size="small">
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput id="component-outlined" value={email} onChange={handleChange} label="Name" />
                </Forms>
                <Button variant="contained" color="primary" type="submit">Invite </Button>
            </form>
        </div>
    )
}
