const express = require('express');
const bodyParser = require('body-parser');

const c = express();
c.use(bodyParser.json())

const database = {
    users: [
        {
            id: '123',
            name: 'faisal',
            email: 'faisal@gmail.com',
            password: 'apel',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'ibal',
            email: 'ibal@gmail.com',
            password: 'mangga',
            entries: 0,
            joined: new Date()
        }
    ] 
}

c.get('/', (req, res) => {
    res.send(database.users);
})

c.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
           res.json('succes') 
    } else {
       res.status(404).json('error Logging in')
    }
})

c.post('/register', (req, res) => {
    const {email, name, password} = req.body;
     database.users.push({
        id: '125',
        name: name ,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
     })
    res.json(database.users[database.users.length-1])
})

c.get('/profile/:id' , (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

c.post ('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

c.listen(3000, () => {
    console.log('running on port 3000')
});