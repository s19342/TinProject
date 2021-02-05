import React, { useState} from 'react';
import Axios from 'axios';
import './Flexboxes.css';

function RegisterProduct() {
    const [nameReg, setNameReg] = useState('');
    const [descriptionReg, setDescriptionReg] = useState('');
    const [nameStatus, setNameStatus] = useState('');
    const [descriptionStatus, setDescriptionStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);
    
    const checkName = () => { return nameReg.length <=50; }

    const checkDescription = () => { return descriptionReg.length <=500; }

    const register = () => {
        if(!checkName()){
            setNameStatus("Name must be at most 50 characters long");
        }else{
            setNameStatus("");
        }

        if(!checkDescription()){
            setDescriptionStatus("Description must be at most 500 characters long");
        }else{
            setDescriptionStatus("");
        }

        if(checkName() && checkDescription()){
            try{
                Axios.post('http://localhost:4000/insertProduct', {Name: nameReg, Description: descriptionReg}).then((response) => {   
                if(response.data.message){
                    setNameStatus("Product name already exists");
                    setServerErrors([]);
                }else if(response.data.errors){
                    setServerErrors([...response.data.errors]);
                }else{
                    setNameStatus("");
                    setDescriptionStatus("");
                    setServerErrors([]);
                }});
            }
            catch(e){

            }
        }
    }

    return (
        <div className="flex-container">
            <h1>Add a product</h1>
            <label>Name</label>
            <input type="text" onChange={(e)=>
            {setNameReg(e.target.value)}}/>
            <h1 className="errorStatus">{nameStatus}</h1>
            <label>Description</label>
            <input type="text" onChange={(e)=>
            {setDescriptionReg(e.target.value)}}/>
            <h1 className="errorStatus">{descriptionStatus}</h1>
            <button className="card-button" onClick={register}>Register</button>
            {serverErrors.map(function(item, i){
                return <li key={i} className="errorStatus">{item.msg}</li>
            })}
        </div>            
    )
}

export default RegisterProduct;
