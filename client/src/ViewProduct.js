import React, { useState} from 'react';
import Axios from 'axios';
import './ViewCustomer.css';

function ViewProduct() {
    const [productsShown, setProductsShown] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [description, setDescription] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [currentEndIndex, setCurrentEndIndex] = useState(2);
    const [descriptionStatus, setDescriptionStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);

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

    const deleteProduct = (productId) => {
        Axios.delete(`http://localhost:4000/deleteProduct/${productId}`);

        toggleView();
    }

    const checkDescription = () => { return description.length <=500; }

    const updateProduct = (id) => {
        if(!checkDescription()){
            setDescriptionStatus("Description must be at most 500 characters long");
        }else{
            Axios.put("http://localhost:4000/updateProduct", {id: id, description: description}).then(response => {if(response.data.errors){
                setServerErrors([...response.data.errors]);
            }else{
                setServerErrors([]);
            }});
        
            toggleView();

            setDescriptionStatus("");
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
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Show Products</button>
            <h1 className="errorStatus">{descriptionStatus}</h1>
            {productsShown ? (
                        productInfo.slice(currentStartIndex, currentEndIndex).map(function(item, i){
                            return <li className="listItemTable" key={i}>Name: {item.name} <p></p> Description: {item.description}<p></p><button className="card-button" onClick={() => deleteProduct(item.idproduct)}>DELETE</button><p></p><label>Description</label><p></p>
                            <input type="text" onChange={(e)=> {setDescription(e.target.value)}}/><p></p>
                            <button className="card-button" onClick={() => updateProduct(item.idproduct)}>Update Description</button></li>
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
            {serverErrors.map(function(item, i){
                return <li key={i} className="errorStatus">{item.msg}</li>
            })}
        </div>
    )
}

export default ViewProduct;
