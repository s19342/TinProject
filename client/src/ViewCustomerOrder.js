import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewCustomerOrder() {
    const [cusOrderShown, setCusOrderShown] = useState(false);
    const [cusOrderInfo, setCusOrderInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewCustomerOrder').then((response) => {
                setCusOrderInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setCusOrderShown(!cusOrderShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!cusOrderShown){
            view();
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
        if(currentPage*2 < cusOrderInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Show Customer Orders</button>
            
            {cusOrderShown ? (
                        cusOrderInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Email: {item.email} <p></p> Date of birth: {item.dateofbirth.substring(0,10)} <p></p> Product ID: {item.idproduct} <p></p> Date Purchased: {item.date.substring(0,10)} <p></p> Amount Purchased: {item.quantity}</li>
                        })
            ) : (
            <div></div>
            )}
            {cusOrderShown ? (<div>
                <p></p>
                <button className="card-button" onClick={previousPage}>Previous Page</button>
                <p>{currentPage}</p>
               <button className="card-button" onClick={nextPage}>Next Page</button></div>
            ) : (<div></div>)}
        </div>
    )
}

export default ViewCustomerOrder;
