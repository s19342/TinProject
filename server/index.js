const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {body, validationResult} = require('express-validator');

const portConnect = process.env.PORT || 3000;
const portListen = process.env.PORT || 4000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'product_shop'
});

app.use(express.json());
app.use(cors({
    origin: [`http://localhost:${portConnect}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "assignment",
    secret: "adnan",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24
    }
}))

app.get('/viewCustomer', (req,res) => {
    db.query("SELECT idcustomer, email, dateofbirth FROM customer", (err, result) => {
        res.send(result);
    })
})

app.delete('/deleteCustomer/:idcustomer', (req,res) => {
    const customerid = req.params.idcustomer;

    db.query("DELETE FROM customer WHERE idcustomer = ?", customerid, (err, result) => {
        if(err){
            console.log(err);
        }
    })
})

app.put('/updateCustomer', 
body('dateofbirth').exists().notEmpty().withMessage('Date of birth cannot be empty').isDate({format: 'YYYY-MM-DD'}).withMessage('Date must be in the format YYYY-MM-DD'),  (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const id = req.body.id;
    const dob = req.body.dateofbirth;

    db.query("UPDATE customer SET dateofbirth = ? WHERE idcustomer = ?", [dob, id], (err, result) => {
        if(err) console.log(err);
    })
})

app.get('/viewProduct', (req,res) => {
    db.query("SELECT idproduct, name, description FROM product", (err, result) => {
        res.send(result);
    })
})

app.delete('/deleteProduct/:idproduct', (req,res) => {
    const productid = req.params.idproduct;

    db.query("DELETE FROM product WHERE idproduct = ?", productid, (err, result) => {
        if(err){
            console.log(err);
        }
    })
})

app.put('/updateProduct',
    body('description').exists().notEmpty().withMessage('Description cannot be empty').isLength({max: 500}).withMessage('Description must be at most 500 characters long'),
    (req, res) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const id = req.body.id;
    const description = req.body.description;

    db.query("UPDATE product SET description = ? WHERE idproduct = ?", [description, id], (err, result) => {
        if(err) console.log(err);
    })
})

app.get('/viewProductCustomer', (req,res) => {
    db.query("SELECT idorder, idcustomer, idproduct, date, quantity FROM ordermade", (err, result) => {
        res.send(result);
    })
})

app.put('/updateOrder',
    body('quantity').exists().notEmpty().withMessage('Quantity cannot be empty').isInt({min: 1}).withMessage('Quantity must be an integer greater than 0'),
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const id = req.body.id;
    const quantity = req.body.quantity;

    db.query("UPDATE ordermade SET quantity = ? WHERE idorder = ?", [quantity, id], (err, result) => {
        if(err) console.log(err);
    })
})

app.delete('/deleteOrder/:idorder', (req,res) => {
    const orderid = req.params.idorder;

    db.query("DELETE FROM ordermade WHERE idorder = ?", orderid, (err, result) => {
        if(err){
            console.log(err);
        }
    })
})

app.get('/viewCustomerOrder', (req,res) => {
    db.query("SELECT c.email, c.dateofbirth, o.idproduct, o.date, o.quantity FROM customer c INNER JOIN ordermade o ON c.idcustomer=o.idcustomer;", (err, result) => {
        res.send(result);
    })
})

app.get('/viewOrderedProduct', (req,res) => {
    db.query("SELECT p.name, p.description, o.date, o.quantity FROM ordermade o INNER JOIN product p ON o.idproduct=p.idproduct;", (err, result) => {
        res.send(result);
    })
})

app.get('/viewFullDetails', (req,res) => {
    db.query("SELECT c.email, c.dateofbirth, p.name, p.description, o.date, o.quantity FROM customer c INNER JOIN ordermade o ON c.idcustomer = o.idcustomer INNER JOIN product p ON o.idproduct = p.idproduct;", (err, result) => {
        res.send(result);
    })
})

app.get('/viewAll', (req,res) => {
    db.query("SELECT c.email, c.password, c.dateofbirth, o.date, o.quantity, p.name, p.description FROM customer c INNER JOIN ordermade o ON c.idcustomer = o.idcustomer INNER JOIN product p ON o.idproduct = p.idproduct;", (err, result) => {
        res.send(result);
    })
})

app.post('/insertProduct', body('Name').exists().notEmpty().withMessage('Name cannot be empty').isLength({max: 50}).withMessage('Name must be at most 50 characters long'), body('Description').exists().notEmpty().withMessage('Description cannot be empty').isLength({max: 500}).withMessage('Description must be at most 500 characters long'), (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }


    const name = req.body.Name;
    const description = req.body.Description;

    db.query("SELECT * FROM product WHERE Name = ?;", [name], (err, result) => {
        
        if(err){
            console.log(err);
            res.send();
        }

        if(result.length !== 0){
            res.send({message: "Product already exists"});
        }else{
            db.query("INSERT INTO product (Name, Description) VALUES (?,?);", [name, description], (err, result) => {
                if(err){
                    console.log(err);
                }

                res.send();
            })
        }
    });
})

app.post('/insertCustomer', 
    body('Password').exists().notEmpty().withMessage('password cannot be empty').isLength({min: 5}).withMessage('password must be at least 5 characters long'),
    body('Email').exists().notEmpty().withMessage('email cannot be empty').isEmail().normalizeEmail().withMessage('Email is not valid'),
    body('DateOfBirth').exists().notEmpty().withMessage('Date of birth cannot be empty').isDate({format: 'YYYY-MM-DD'}).withMessage('Date must be in the format YYYY-MM-DD'), (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const email = req.body.Email;
    const password = req.body.Password;
    const dateOfBirth = req.body.DateOfBirth;

    db.query("SELECT * FROM customer WHERE Email = ?;", [email], (err, result) => {
        
        if(err){
            console.log(err);
            res.send();
        }

        if(result.length !== 0){
            res.send({message: "Email already exists"});
        }else{
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    console.log(err);
                }
        
                db.query("INSERT INTO customer (Email, Password, DateOfBirth) VALUES (?,?,?);", [email, hash, dateOfBirth], (err, result) => {
                    if(err){
                        console.log(err);
                    }
                });
            })

            res.send({status: 200});
        }
    });
})

app.post('/insertOrder',
body('IdCustomer').exists().notEmpty().withMessage('IdCustomer cannot be empty').isInt({min: 1}).withMessage('IdCustomer must be an integer greater than 0'),
body('IdProduct').exists().notEmpty().withMessage('IdProduct cannot be empty').isInt({min: 1}).withMessage('IdProduct must be an integer greater than 0'),
body('Quantity').exists().notEmpty().withMessage('Quantity cannot be empty').isInt({min: 1}).withMessage('Quantity must be an integer greater than 0'),
body('Date').exists().notEmpty().withMessage('Date cannot be empty').isDate({format: 'YYYY-MM-DD'}).withMessage('Date must be in the format YYYY-MM-DD'), (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const customerid = req.body.IdCustomer;
    const productid = req.body.IdProduct;;
    const date = req.body.Date;
    const quantity = req.body.Quantity;

    db.query("INSERT INTO ordermade (IdCustomer, IdProduct, Date, Quantity) VALUES (?,?,?,?);", [customerid, productid, date, quantity], (err, result) => {
        if(err){
            console.log(err);
        }
    })

    res.send({status: 200});
})

app.get('/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})

app.post('/login', body('password').exists().notEmpty().withMessage('password cannot be empty').isLength({min: 5}).withMessage('password must be at least 5 characters long'),
body('email').exists().notEmpty().withMessage('email cannot be empty').isEmail().normalizeEmail().withMessage('Email is not valid'), (req,res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()});
    }

    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM customer WHERE email = ?;", [email], (err, result) => {
        if(err){
            res.send({err: err});
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].Password, (error, response) => {
                req.session.user = result;
                if(response){
                    res.send(result);
                }else{
                    res.send({message: "Wrong username/password combination!"})
                }
            })
        }else{
            res.send({message: "User doesn't exist"});
        }
    })
})

app.listen(portListen, () => {
    console.log(`Listening on port ${portListen}`);
  });