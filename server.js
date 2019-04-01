const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const auth = require('./data/router/auth.js');

const sessionConfig = {
    name: "jake",
    secret: "keep it secret, keep it safe",
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false,
    },
    httpOnly: true,
    resave:false,
    saveUninitialized: false,
}

const server = express();
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))
server.use('/api/', auth);

server.get('/', (req,res) => {
    res.send('This is my Server!!!');
})


module.exports = server;