const express = require('express');
const helmet = require('helmet');

const auth = require('./helpers/router/auth.js');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api', auth);

server.get('/', (req,res) => {
    res.send('This is my Server!!!');
})


module.exports = server;