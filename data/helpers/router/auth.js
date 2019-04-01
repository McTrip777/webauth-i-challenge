const express = require('express');
const bcrypt = require('bcryptjs');
const Auth = require('../modules/authDB.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    Auth.add(user)
        .then(saved => {
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
            if (user) {
                res.status(200).json({ message: `Welcome ${user.username}`})
            }else {
                res.status(401).json({ message: 'Try Again'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/user', (req,res) => {
    Auth.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.send(error)
        })
})

module.exports = router;