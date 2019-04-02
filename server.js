const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const auth = require('./data/router/auth.js');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('./data/helpers/dbConfig.js')

const server = express();

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

    store:new KnexSessionStore({
        knex:db,
        tablename:'sessions',
        myfieldname: 'my',
        createTable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))
server.use('/api/', auth);

server.get('/', (req,res) => {
    res.send('This is my Server!!!');
})


module.exports = server;