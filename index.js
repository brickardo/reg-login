const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const {check} = require('express-validator');

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async ()=>{
    try {

        await mongoose.connect('mongodb://localhost:27017/curtka');

        app.listen(7070, ()=>{
            console.log("Started");
        });
    } catch (e) {
        console.log(e);
    }
}


start();