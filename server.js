const http = require('http');
const PORT = 8000;
const app = require('./app.js');
let server = http.createServer(app);
server.listen(PORT);
console.log("server is listening on 8000");
