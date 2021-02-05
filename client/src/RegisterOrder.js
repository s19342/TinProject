import React, { useState} from 'react';
import Axios from 'axios';
import './Flexboxes.css';

function RegisterOrder() {
    const [customerIdReg, setCustomerIdReg] = useState('');
    const [productIdReg, setProductIdReg] = useState('');
    const [orderDateReg, setOrderDateReg] = useState('');
    const [orderQuantityReg, setOrderQuantityReg] = useState('');
    const [customerIdRegStatus, setCustomerIdRegStatus] = useState('');
    const [productIdRegStatus, setProductIdRegStatus] = useState('');
    const [orderDateRegStatus, setOrderDateRegStatus] = useState('');
    const [orderQuantityRegStatus, setOrderQuantityRegStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);

    const checkCusId = () => {
        return customerIdReg >= 1;
    }

    const checkProId = () => {
        return productIdReg >= 1;
    }

    const checkDate = () => {
        var regex = /\d{4}-\d{2}-\d{2}/;
        return regex.test(orderDateReg);
    }

    const checkQuantity = () => {
        return orderQuantityReg >= 1;
    }

    const register = () => {
        if(!checkCusId()){
            setCustomerIdRegStatus("Customer Id must be greater than 0");
        }else{
            setCustomerIdRegStatus("");
        }

        if(!checkProId()){
            setProductIdRegStatus("Product Id must be greater than 0");
        }else{
            setProductIdRegStatus("");
        }

        if(!checkDate()){
            setOrderDateRegStatus("Date of birth must be in the format YYYY-MM-DD");
        }else{
            setOrderDateRegStatus("");
        }

        if(!checkQuantity()){
            setOrderQuantityRegStatus("Quantity must be greater than 0");
        }else{
            setOrderQuantityRegStatus("");
        }

        if(checkCusId() && checkProId() && checkDate() && checkQuantity()){
            try{
                Axios.post('http://localhost:4000/insertOrder', {IdCustomer: customerIdReg, IdProduct: productIdReg, Date: orderDateReg, Quantity: orderQuantityReg}).then((response) => {
                if(response.data.errors){
                    setServerErrors([...response.data.errors]);
                }else{
                    setCustomerIdRegStatus("");
                    setProductIdRegStatus("");
                    setOrderDateRegStatus("");
                    setOrderQuantityRegStatus("");
                    setServerErrors([]);
                }});
            }catch(e){
                console.log(e);
            }
        }
    }

    return (
        <div className="flex-container">
            <h1>Add an order</h1>
            <label>Customer ID</label>
            <input type="number" onChange={(e)=>
            {setCustomerIdReg(e.target.value)}}/>
            <h1 className="errorStatus">{customerIdRegStatus}</h1>
            <label>Product ID</label>
            <input type="number" onChange={(e)=>
            {setProductIdReg(e.target.value)}}/>
            <h1 className="errorStatus">{productIdRegStatus}</h1>
            <label>Date of Order</label>
            <input type="text" placeholder="YYYY-MM-DD" onChange={(e)=>
            {setOrderDateReg(e.target.value)}}/>
            <h1 className="errorStatus">{orderDateRegStatus}</h1>
            <label>Quantity of order</label>
            <input type="text" onChange={(e)=>
            {setOrderQuantityReg(e.target.value)}}/>
            <h1 className="errorStatus">{orderQuantityRegStatus}</h1>
            <button className="card-button" className="card-button" onClick={register}>Register</button>
            {serverErrors.map(function(item, i){
                return <li key={i} className="errorStatus">{item.msg}</li>
            })}
        </div>            
    )
}

export default RegisterOrder;
