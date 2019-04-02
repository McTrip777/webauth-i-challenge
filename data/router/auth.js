const express = require('express');
const bcrypt = require('bcryptjs');
// const session = require('express-session');
const Auth = require('../helpers/authDB.js');

const router = express.Router();

router.post('/register', restricted, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;
    
    Auth.add(user)
        .then(saved => {
            req.session.user = saved
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Auth.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}`})
            }else {
                res.status(401).json({ message: 'Try Again'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

function restricted(req, res, next){
    if(req.session && req.session.user){
        next();
    }else{
        res.status(401).json({ message: 'You are not loggedin '})
    }
}

router.get('/user',restricted, (req,res) => {
    Auth.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.send(error)
        })
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(error =>{
            if(error){
                res.send(error)
            }else{
                res.send('You are logged out')
            }
        })
    }else{
        res.end();
    }
})

module.exports = router;