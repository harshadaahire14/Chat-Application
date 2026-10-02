const socket = io();

const messagesDiv =
document.getElementById("messages");

socket.on('chatHistory',(messages)=>{

    messages.forEach(msg=>{
        addMessage(msg.username,msg.message);
    });

});

socket.on('chatMessage',(data)=>{
    addMessage(data.username,data.message);
});

function sendMessage(){

    const username =
    document.getElementById("username").value;

    const message =
    document.getElementById("messageInput").value;

    if(username && message){

        socket.emit('chatMessage',{
            username,
            message
        });

        document.getElementById("messageInput").value="";
    }
}

function addMessage(user,msg){

    const div=document.createElement("div");

    div.classList.add("message");

    div.innerHTML =
    `<strong>${user}:</strong> ${msg}`;

    messagesDiv.appendChild(div);

    messagesDiv.scrollTop =
    messagesDiv.scrollHeight;
}