var express = require('express');
var socket = require('socket.io');
//app setup
var app = express();

var server = app.listen(3000,function(){
  console.log("you are listening to 3000 port");
});

//for accessing static files
app.use(express.static('public'));

//socket setup
var io = socket(server);
io.on('connection',function(socket){
  console.log("socket connection is made "+socket.id);

  //to hanndle message event by the client or user
   socket.on('chat',function(data){
    //again emiting the message to the client
    console.log(data);
    io.sockets.emit('chat',data);
  });
  //handle typing event
  socket.on('typing',function(data){
    console.log("broad cast message");    
    socket.broadcast.emit('typing',data);
    console.log("akshay");
  });

  socket.on('not_typing',function(data){
    console.log("broad cast message on key up");    
    socket.broadcast.emit('not_typing',data);
  });

});
