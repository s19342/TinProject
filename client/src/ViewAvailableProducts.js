import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewAvailableProducts() {
    const [productsShown, setProductsShown] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);

    const view = () => {
        try{
            Axios.get('http://localhost:4000/viewProduct').then((response) => {
                setProductInfo([...response.data]);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const toggleVisiblity = () => {
        setProductsShown(!productsShown);
    }

    const toggleView = () => {
        toggleVisiblity();

        if(!productsShown){
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
        if(currentPage*2 < productInfo.length){
            setCurrentPage(currentPage+1);
            setCurrentStartIndex(currentStartIndex+2);
            setCurrentEndIndex(currentEndIndex+2);
        }
    }

    return (
        <div className="viewProduct">
            <button className="card-button" onClick={toggleView}>View Available Products</button>
            
            {productsShown ? (
                        productInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Name: {item.name} <p></p> Description: {item.description}</li>
                        })
            ) : (
            <div></div>
            )}
            {productsShown ? (<div>
                <p></p>
                <button className="card-button" onClick={previousPage}>Previous Page</button>
                <p>{currentPage}</p>
               <button className="card-button" onClick={nextPage}>Next Page</button></div>
            ) : (<div></div>)}
        </div>
    )
}

export default ViewAvailableProducts;
