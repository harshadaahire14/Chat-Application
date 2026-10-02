const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.static('public'));

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.on('connection',(socket)=>{

    console.log("User Connected");

    db.query(
        "SELECT * FROM messages ORDER BY created_at ASC",
        (err,result)=>{
            if(!err){
                socket.emit('chatHistory',result);
            }
        }
    );

    socket.on('chatMessage',(data)=>{

        db.query(
            "INSERT INTO messages(username,message) VALUES (?,?)",
            [data.username,data.message]
        );

        io.emit('chatMessage',data);
    });

    socket.on('disconnect',()=>{
        console.log("User Disconnected");
    });
});

server.listen(3000,()=>{
    console.log("Server running on port 3000");
});