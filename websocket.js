module.exports =(io)=>{
    io.on('connection', (socket) => {
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
        });
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
    })
};
