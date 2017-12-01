const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport');
const bodyParser = require('body-parser');
const router = require('./router')(express);
const port = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const websocket = require('./websocket')(io);
/*const sharedsesssion = require('express-socket.io-session');
const path = require('path');
const RedisStore = require('connect-redis')(session);
const client = require('./redis');
const sessionStore = new RedisStore({client:client});
const sessionMiddleware =session({
    store:new RedisStore({}),
    secret:'keyboard cat'
});*/


app.use(session({
    secret: 'supersecret'
}));

/*io.use((socket,next)=>{
    sessionMiddleware(socket.request,socket.request.res,next);
});
io.use(sessionMiddleware);*/

app.use(bodyParser());

setupPassport(app);

app.use('/', router);

http.listen(port);
console.log('listening on port ', port);