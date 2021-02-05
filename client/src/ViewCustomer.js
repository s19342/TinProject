import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewCustomer() {
    const [customersShown, setCustomersShown] = useState(false);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [dob, setDob] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);
    const [dobStatus, setDobStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewCustomer').then((response) => {
            setCustomerInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setCustomersShown(!customersShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!customersShown){
            view();
        }
    }

    const deleteCustomer = (customerId) => {
        Axios.delete(`http://localhost:4000/deleteCustomer/${customerId}`);

        toggleView();
    }

    const checkDob = () => {
        var regex = /\d{4}-\d{2}-\d{2}/;
        return regex.test(dob);
    }

    const updateCustomer = (id) => {
        if(!checkDob()){
            setDobStatus("Date of birth must be in the format YYYY-MM-DD");
        }else{
            Axios.put("http://localhost:4000/updateCustomer", {id: id, dateofbirth: dob}).then((response) => {
                if(response.data.errors){
                    setServerErrors([...response.data.errors]);
                }else{
                    setServerErrors([]);
                }}
            );
        
            toggleView();
            setDobStatus("");
        }
    }

    const previousPage = () => {
        if(currentPage !== 1){
            setCurrentPage(currentPage-1);
            setCurrentStartIndex(currentStartIndex-2);
            setCurrentEndIndex(currentEndIndex-2);
        }
    }

    const nextPage = () => {
        if(currentPage*2 < customerInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" className="card-button" onClick={toggleView}>Show Customers</button>
            
            <h1 className="errorStatus">{dobStatus}</h1>
            {customersShown ? (
                        customerInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Email: {item.email} <p></p> Date Of Birth: {item.dateofbirth.substring(0,10)}<p></p>
                            <button className="card-button" onClick={() => deleteCustomer(item.idcustomer)}>DELETE</button><p></p>
                            <label>Date of birth</label><p></p>
                            <input type="text" placeholder="YYYY-MM-DD" onChange={(e)=> {setDob(e.target.value)}}/><p></p>
                            <button className="card-button" onClick={() => updateCustomer(item.idcustomer)}>Update DOB</button>
                            </li>
                        })
            ) : (
            <div></div>
            )}
            {customersShown ? (<div>
                <p></p>
                <button className="card-button" onClick={previousPage}>Previous Page</button>
                <p>{currentPage}</p>
               <button className="card-button" onClick={nextPage}>Next Page</button></div>
            ) : (<div></div>)}
            {serverErrors.map(function(item, i){
                return <li key={i} className="errorStatus">{item.msg}</li>
            })}
        </div>
    )
}

export default ViewCustomer;
