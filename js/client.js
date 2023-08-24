const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio= new Audio('pop-up-something-160353.mp3');
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position == 'left'){

    audio.play();
  }
};
form.addEventListener('submit',(e)=>{
 e.preventDefault();
 const message = messageInput.value ;
 append(`You : ${message}` , 'right');
 socket.emit('send' , message);
 messageInput.value = "";
})
const name1 = prompt("Enter Your name");
socket.emit("new-user-joined", name1);

socket.on("user-joined", data => {
  append(`${data} joined the chat`, "left");
});


socket.on('receive' ,data =>{
  console.log(data)
  append(`${data.name} : ${data.message}`, "left");
})

socket.on('left' ,name =>{
  // console.log(data)
  append(`${name} left the chet`, "left");
})
