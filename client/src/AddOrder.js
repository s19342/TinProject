import React, { useState} from 'react';
import RegisterOrder from "./RegisterOrder";

function AddOrder() {
    const [register, setRegister] = useState(false);

    const toggleView = () => {
        setRegister(!register);
    }

    return (
        <div className="viewCustomer">
            <button className="card-button" onClick={toggleView}>Register an order</button>
            
            {register ? <RegisterOrder /> :
            <div></div>}
        </div>
    )
}

export default AddOrder;
