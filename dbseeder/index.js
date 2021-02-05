const Axios = require('axios');

Axios.defaults.withCredentials = true;

const connectUrl = 'http://localhost:4000'; 

const seedProduct = async () => {
    const insertProductUrl = "insertProduct"

    try{
        const resp = await Axios.post(`${connectUrl}/${insertProductUrl}`, {Name: "product1", Description: "describing product 1"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertProductUrl}`, {Name: "product2", Description: "describing product 2"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertProductUrl}`, {Name: "product3", Description: "describing product 3"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertProductUrl}`, {Name: "product4", Description: "describing product 4"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertProductUrl}`, {Name: "product5", Description: "describing product 5"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }  

    return true;
}

const seedCustomer = async() => {
    const insertCustomerUrl = "insertCustomer"

    try{
        const resp = await Axios.post(`${connectUrl}/${insertCustomerUrl}`, {Email: "customer1@gmail.com", Password: "customer1password", DateOfBirth: "1984-04-23"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertCustomerUrl}`, {Email: "customer2@gmail.com", Password: "customer2password", DateOfBirth: "1990-10-12"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    try{
        const resp = await Axios.post(`${connectUrl}/${insertCustomerUrl}`, {Email: "customer3@gmail.com", Password: "customer3password", DateOfBirth: "1987-03-12"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }  

    try{
        const resp = await Axios.post(`${connectUrl}/${insertCustomerUrl}`, {Email: "customertest@email.com", Password: "testpassword", DateOfBirth: "1993-02-01"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    } 

    try{
        const resp = await Axios.post(`${connectUrl}/${insertCustomerUrl}`, {Email: "admin@admin.com", Password: "admin", DateOfBirth: "1990-01-10"});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    } 

    return true;
}

const seedOrderMade = async() => {
    const insertOrderUrl = "insertOrder"

    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 1, IdProduct: 1, Date: "2001-04-23", Quantity: 20});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }
    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 1, IdProduct: 2, Date: "2001-05-12", Quantity: 15});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }
    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 2, IdProduct: 3, Date: "2003-06-11", Quantity: 10});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }
    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 2, IdProduct: 4, Date: "2004-07-10", Quantity: 12});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }
    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 3, IdProduct: 5, Date: "2005-05-12", Quantity: 19});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }
    
    try{
        const resp = await Axios.post(`${connectUrl}/${insertOrderUrl}`, {IdCustomer: 3, IdProduct: 5, Date: "2005-06-10", Quantity: 17});
        console.log(resp.status);
    }catch(e){
        console.log(e);
    }

    return true;
}

const start = async function(){
    const resp2 = await seedCustomer();
    const resp1 = await seedProduct();
    const resp3 = await seedOrderMade();
}

start();