//make connection at front end
var socket = io.connect('http://localhost:3000/');
//emitting message to server
//query dom
var message = document.getElementById('message'),
 username = document.getElementById('username'),
 button = document.getElementById('send-message'),
 output = document.getElementById('chat-output-message'),
 feed = document.getElementById('feed'),
 feedback = document.getElementById('feedback');

//to remove the error message after some time
function remSuccessMesg(){
  document.querySelector('#errMsg').style.display = "none";
  clearInterval(clearFunc);
}

//emit event when user clicks button
button.addEventListener('click',function(){

  //to user name should no be empty
 if(username.value == ""){
   document.querySelector('#errMsg').style.display = "block";
   $("div.emojionearea-editor").text("");
   clearFunc = setInterval(remSuccessMesg,3000);
  
 }
 else{
 //this takes two parameter 1. name of chat message 2. itself the message in object format
 socket.emit('chat', {
     message: message.value,
     handle: username.value
 },200);
 $("div.emojionearea-editor").text("");
 message.value = ""; 
 
 //when messge is typed the user will visible  
 if(message.value == "")
 socket.emit('not_typing',200);
}
});
  

//emit eventlistener at keypress
message.addEventListener('keydown', function(){  
  alert("hello");
  socket.emit('typing', username.value); 
});

//listen for event
socket.on('chat',function(data){
  output.innerHTML += '<p style="text-align: right;"><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

//listen for broadcast event
socket.on('typing',function(data){
  console.log("who is typing");
  feed.innerHTML = '<em>'+ data + ' is typing a message......</em>';
});

//listeen for broadcast event for not typing
socket.on('not_typing',function(data){
  console.log(data);
  feed.innerHTML ='';
});