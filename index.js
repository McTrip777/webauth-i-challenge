const server = require('./server');

server.listen(4000, (req,res) => {
    console.log('server listening on port 4000');
});