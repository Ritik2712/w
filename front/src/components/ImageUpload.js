import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import {connect} from 'react-redux' 
import { Redirect } from "react-router";
function ImageUpload({token, dispatch}) {
    const [file,setFile]=useState('')
    const [src,setsrc]=useState('data:image/png;base64,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')
    const [redirect,setRedirect] = useState(false)
    const onchange=(e)=>{
        setFile(e.target.files[0])
        setsrc( URL.createObjectURL(e.target.files[0]))
    }
    const submit=(e)=>{
        e.preventDefault()
        const DATA=new FormData()
        DATA.append("file",file)
        const HEADERS={
            "Authorization":`Token ${token}`,
            "Content-Type":"multipart/form-data"
        }
        var flag=true
        axios({
            method:"POST",
            url:"http://localhost:8000/api/upload",
            data:DATA,
            headers:HEADERS
        }).then(res=>{console.log(res.data);})
        .catch(e=>{flag=false})
        setTimeout(() => {
            if(flag){
                setRedirect(true)
            }else{
                alert("You are not authorized")
            }
        }, 900);
    }

    if(redirect){
        return(<Redirect to="/task"/>)
    }



    return (
        <div>
            <br/>
            <br/>
            <br/>
            <Avatar
            alt="Remy Sharp"
            src={src}
            style={{ width: 170, height: 170,margin:"30px auto" }}
            />
      <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">
                <form>
                <div className="custom-file mb-3">
                    <input type="file" name="file" id="file" accept="image/*" className="custom-file-input" onChange={onchange} />
                    <label className="custom-file-label">Choose File</label>
                </div>
                <input type="submit" value="Submit" onClick={submit} className="btn btn-primary btn-block"/>
                </form>  
            </div>
        </div>
      </div>
    </div>
    )
}

const mapStateToProps = (state)=>{
    return{
      token: state.user.token
    }
  }
  export default connect(mapStateToProps)(ImageUpload)

