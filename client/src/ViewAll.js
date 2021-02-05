import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewAll() {
    const [detailsShown, setDetailsShown] = useState(false);
    const [detailsInfo, setDetailsInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewAll').then((response) => {
                setDetailsInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setDetailsShown(!detailsShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!detailsShown){
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
        if(currentPage*2 < detailsInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Show all connected rows and columns</button>
            
            {detailsShown ? (
                        detailsInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Customer Email: {item.email} <p></p> Hashed Password: {item.password} <p></p> Date of birth: {item.dateofbirth.substring(0,10)} <p></p> Product Name: {item.name} <p></p> Product Description: {item.description} <p></p> Date Purchased: {item.date.substring(0,10)} <p></p> Amount Purchased: {item.quantity}</li>
                        })
            ) : (
            <div></div>
            )}
            {detailsShown ? (<div>
                <p></p>
                <button className="card-button" onClick={previousPage}>Previous Page</button>
                <p>{currentPage}</p>
               <button className="card-button" onClick={nextPage}>Next Page</button></div>
            ) : (<div></div>)}
        </div>
    )
}

export default ViewAll;
