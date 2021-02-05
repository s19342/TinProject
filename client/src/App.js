import './App.css';
import React, { useState, useEffect} from 'react';
import ViewCustomer from "./ViewCustomer";
import ViewProduct from "./ViewProduct";
import ViewCusPro from "./ViewCusPro";
import ViewCustomerOrder from "./ViewCustomerOrder";
import ViewProductOrder from "./ViewProductOrder";
import ViewFullDetails from "./ViewFullDetails";
import AddCustomer from "./AddCustomer";
import ViewAvailableProducts from "./ViewAvailableProducts";
import AddProduct from "./AddProduct";
import AddOrder from "./AddOrder";
import ViewAll from "./ViewAll";
import Axios from 'axios';


function App() {
  const [loginStatus, setLoginStatus] = useState('');
  const[loggedin, setLoggedin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLogged, setEmailLogged] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [serverErrors, setServerErrors] = useState([]);

  Axios.defaults.withCredentials = true;

  const login = () => {
    if(!checkEmail()){
      setEmailStatus("Email is in the wrong format");
    }else{
      setEmailStatus("");
    }

    if(!checkPassword()){
      setPasswordStatus("Password must be at least 8 letters long");
    }else{
      setPasswordStatus("");
    }

    if(checkEmail() && checkPassword()){
      Axios.post('http://localhost:4000/login', {email: email, password: password}).then((response) => {
        if(response.data.message){
          setLoginStatus(response.data.message);
          setLoggedin(false);
          setServerErrors([]);
        }else if(response.data.errors){
          console.log('there');
          setServerErrors([...response.data.errors]);
        }
        else{
          setLoginStatus(response.data[0].Email);
          setLoggedin(true);
          setEmailLogged(email);
          setServerErrors([]);
        }
      });
      
      setEmailStatus('');
      setPasswordStatus('');
    }
  }

  const checkEmail = () => {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  const checkPassword = () => {
    return password.length >=5;
  }

  useEffect(() => {
    Axios.get("http://localhost:4000/login").then((response) => {if(response.data.loggedIn === true){
      setLoginStatus(response.data.user[0].email)}});
  }, []);

  return (
    <div className="App">
      
      {!loggedin ? (
        <div clasName="main-container">
          <div className="flex-container">
            <h1>Login</h1>
            <label>Email</label>
            <input type="text" placeholder="email..." onChange={(e)=>
              {setEmail(e.target.value)}}/>
            <h1 className="errorStatus">{emailStatus}</h1>
            <label>Password</label>
            <input type="password" placeholder="password..." onChange={(e)=>
              {setPassword(e.target.value)}}/>
            <h1 className="errorStatus">{passwordStatus}</h1>
            <button className="card-button" onClick={login}>Login</button>
            {serverErrors.map(function(item, i){
                    return <li key={i} className="errorStatus">{item.msg}</li>
                })}
            <h1>{loginStatus}</h1>
            <div className="listCard">
              <div className="app-register"><AddCustomer /></div>
            </div>
          </div>
      </div>) : (emailLogged !== 'admin@admin.com' ? (
      <div>
        <h1>{loginStatus}</h1>
        <p></p>
        <div className="listCard">
        <ViewAvailableProducts />
          <p></p>
        </div>
      </div>
      ) : (
        <div>
        <h1>{loginStatus}</h1>
        <div className="menu">
          
        <p></p>
        <div className="listCard">
        <AddCustomer />
        </div>
        <p></p>
        <div className="listCard">
        <AddProduct />
        </div>
        <p></p>
        <div className="listCard">
        <AddOrder />
        </div>
        <p></p>
        <div className="listCard">
        <ViewCustomer />
        </div>
        <p></p>
        <div className="listCard">
        <ViewProduct />
        </div>
        <p></p>
        <div className="listCard">
        <ViewCusPro />
        </div>
        <p></p>
        <div className="listCard">
        <ViewCustomerOrder />
        </div>
        <p></p>
        <div className="listCard">
        <ViewFullDetails />
        </div>
        <p></p>
        <div className="listCard">
        <ViewProductOrder />
        </div>
        <p></p>
        <div className="listCard">
        <ViewAll />
        </div>
        <p></p>
        </div>
        </div>
      )
      )}     
    </div>
  );
}

export default App;
