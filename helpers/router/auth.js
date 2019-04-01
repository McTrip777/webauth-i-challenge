const express = require('express');
const bcrypt = require('bcryptjs');
const Auth = require('./authDB.js');

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


// router.get('/user', (req,res) => {

// })








module.exports = router;