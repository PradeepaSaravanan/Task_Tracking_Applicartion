const express= require('express');
const dotenv=require('dotenv');
const logger= require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const routes=require('./router/register')
const socketIO=require('socket.io');
// const http= require('http');
require('colors')



const db= require('./config/db')
const app=express();



app.use(express.static('./FrontEnd'));


dotenv.config({path:"./config/config.env"});
 const server=db(app);

const io=socketIO(server);
io.on('connection',(socket)=>{
    console.log("Admin Connnected");
    socket.on('sendNotification', (userId, message) => {
        io.to(userId).emit('notification', message);
          });
})



app.use(bodyParser.json());

app.use(cors());
app.use(express.urlencoded({extended:false}))

if (process.env.NODE_ENV === "development") app.use(logger("dev"));
app.use(routes);
module.exports=app