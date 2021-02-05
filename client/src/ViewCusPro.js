import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewCusPro() {
    const [cusproShown, setCusproShown] = useState(false);
    const [cusproInfo, setCusproInfo] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);
    const [orderQuantityRegStatus, setOrderQuantityRegStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewProductCustomer').then((response) => {
                setCusproInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setCusproShown(!cusproShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!cusproShown){
            view();
        }
    }

    const deleteOrder = (orderId) => {
        Axios.delete(`http://localhost:4000/deleteOrder/${orderId}`);

        toggleView();
    }

    const checkQuantity = () => {
        return quantity >= 1;
    }

    const updateOrder = (id) => {
        if(!checkQuantity()){
            setOrderQuantityRegStatus("Quantity must be greater than 0");
        }else{
            Axios.put("http://localhost:4000/updateOrder", {id: id, quantity: quantity}).then(response => {
                {if(response.data.errors){
                    setServerErrors([...response.data.errors]);
                }else{
                    setServerErrors([]);
                }}
            });
        
            toggleView();
            setOrderQuantityRegStatus("");
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
        if(currentPage*2 < cusproInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Show Orders</button>
            <h1 className="errorStatus">{orderQuantityRegStatus}</h1>
            {cusproShown ? (
                        cusproInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Product ID: {item.idproduct} <p></p> Customer ID: {item.idcustomer} <p></p> Date of Purchase: {item.date.substring(0,10)} <p></p> Amount Purchased: {item.quantity}<p></p><button className="card-button" onClick={() => deleteOrder(item.idorder)}>DELETE</button><p></p>
                            <label>Quantity</label><p></p>
                            <input type="number" onChange={(e)=> {setQuantity(e.target.value)}}/><p></p>
                            <button className="card-button" onClick={() => updateOrder(item.idorder)}>Update Quantity</button>
                            </li>
                        })
            ) : (
            <div></div>
            )}
            {cusproShown ? (<div>
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

export default ViewCusPro;
