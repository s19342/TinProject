import React, { useState} from 'react';
import Axios from 'axios';
import './Flexboxes.css';


function Register() {
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [dobReg, setDob] = useState('');
    const [emailStatus, setEmailStatus] = useState('');
    const [passwordStatus, setPasswordStatus] = useState('');
    const [dobStatus, setDobStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);


    const checkEmail = () => {
        var regex = /\S+@\S+\.\S+/;
        return regex.test(emailReg);
    }
   
    const checkPassword = () => { return passwordReg.length >=5; }

    const checkDob = () => {
        var regex = /\d{4}-\d{2}-\d{2}/;
        return regex.test(dobReg);
    }

    const register = () => {
        if(!checkEmail()){
            setEmailStatus("Email is in the wrong format");
        }else{
            setEmailStatus("");
        }
      
        if(!checkPassword()){
            setPasswordStatus("Password must be at least 8 letters long");
        }else{
            setPasswordStatus("");
        }

        if(!checkDob()){
            setDobStatus("Date of birth must be in the format YYYY-MM-DD");
        }else{
            setDobStatus("");
        }

        if (checkEmail() && checkPassword() && checkDob()){
            try{
                Axios.post('http://localhost:4000/insertCustomer', {Email: emailReg, Password: passwordReg, DateOfBirth: dobReg}).then((response) => {   

                if(response.data.errors){
                    setServerErrors([...response.data.errors]);
                }else{
                    setServerErrors([]);
                }
            });
            }
            catch(e){

            }

            setEmailStatus("");
            setPasswordStatus("");
            setDobStatus("");
        }
    }

    return (
        <div className="flex-container">
            <h1>Add Customer</h1>
            <label>Email</label>

            <input type="text" onChange={(e)=>
            {setEmailReg(e.target.value)}}/>
            <h1 className="errorStatus">{emailStatus}</h1>
            <label>Password</label>
            <input type="password" onChange={(e)=>
            {setPasswordReg(e.target.value)}}/>
            <h1 className="errorStatus">{passwordStatus}</h1>
            <label>Date of birth</label>
            <input type="text" placeholder="YYYY-MM-DD" onChange={(e)=>
            {setDob(e.target.value)}}/>
            <h1 className="errorStatus">{dobStatus}</h1>
            <button className="card-button" onClick={register}>Register</button>
            {serverErrors.map(function(item, i){
                return <li key={i} className="errorStatus">{item.msg}</li>
            })}
      </div>            
    )
}

export default Register;
