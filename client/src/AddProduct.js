import React, { useState} from 'react';
import RegisterProduct from "./RegisterProduct";

function AddProduct() {
    const [register, setRegister] = useState(false);

    const toggleView = () => {
        setRegister(!register);
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Register a product</button>
            
            {register ? <RegisterProduct /> :
            <div></div>}
        </div>
    )
}

export default AddProduct;
