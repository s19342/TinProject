import React, { useState} from 'react';
import Register from "./Register";
import "./ViewCustomer.css"

function AddCustomer() {
    const [register, setRegister] = useState(false);

    const toggleView = () => {
        setRegister(!register);
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Register as Customer</button>
            
            {register ? <Register /> :
            <div></div>}
        </div>
    )
}

export default AddCustomer;
