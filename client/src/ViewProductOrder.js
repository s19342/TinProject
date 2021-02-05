import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewProductOrder() {
    const [proOrderShown, setProOrderShown] = useState(false);
    const [proOrderInfo, setProOrderInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewOrderedProduct').then((response) => {
                setProOrderInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setProOrderShown(!proOrderShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!proOrderShown){
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
        if(currentPage*2 < proOrderInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }


    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Show Ordered Products</button>
            
            {proOrderShown ? (
                        proOrderInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Name: {item.name} <p></p> Description: {item.description} <p></p> Date Purchased: {item.date.substring(0,10)} <p></p> Amount Purchased: {item.quantity}</li>
                        })
            ) : (
            <div></div>
            )}
            {proOrderShown ? (<div>
                <p></p>
                <button className="card-button" onClick={previousPage}>Previous Page</button>
                <p>{currentPage}</p>
               <button className="card-button" onClick={nextPage}>Next Page</button></div>
            ) : (<div></div>)}
        </div>
    )
}

export default ViewProductOrder;
