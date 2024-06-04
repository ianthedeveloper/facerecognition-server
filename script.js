import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';


const server = express();

server.use(bodyParser.json());

const database = {
    users: [
        {
            id: 111, 
            name: "BMW",
            email: "bmw@gmail.com",
            password: "V12",
            entries: 0,
            joined: new Date ()
        }, 
    
        {
            id: 122,
            name: "Aston Martin",
            email: "astonmartin@gmail.com",
            password: "DB12",
            entries: 0,
            joined: new Date ()
        }
    ]    
}


server.get('/', (req, res) => {
    console.log("Method:", req.method);
    res.json(database.users);
})


server.post('/signin', (req, res) => {
    console.log("Method:", req.method);

    // // Load hash from your password DB.
    // bcrypt.compare("p1", "$2a$10$w9z0qePYXLzguURnlXu2dubNXIqwVZnFmheeYKtHYSvpk23lS10gC", function(err, res) {
    //     console.log("Res:", res);
    // });
    // bcrypt.compare("veggies", "$2a$10$w9z0qePYXLzguURnlXu2dubNXIqwVZnFmheeYKtHYSvpk23lS10gC", function(err, res) {
    //     console.log("Res:", res)
    // });


    if(req.body.name === database.users[0].name && req.body.password === database.users[0].password){
        res.json("Success!");
        console.log("Success signing in!")
    }else{
        res.status(400).send("Error! Error! Error!")
        console.log("Bad Request!")
    }
})


server.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    
    database.users.push(
        {
            id: 133,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date ()
        }
    )

    res.json(database.users[database.users.length - 1]);
    console.log("New User: ", database.users[database.users.length - 1]);
})


server.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
            // console.log(user);
        }
    })

    if(!found){
        res.status(400).json("INVALID USER ID")
    }
})


server.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
            // console.log(user);
        }
    })

    if(!found){
        res.status(400).json("INVALID USER ID")
    }
})


server.listen(3003, () => {
    console.log("Server is working!")
})