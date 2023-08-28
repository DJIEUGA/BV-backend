const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const initialRoles = require('./utils/initialRoles');

const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const roleRouter = require('./routes/rolesRouter');
const uploadImageRouter = require("./routes/uploadImageRoute");
const containerRouter = require("./routes/containerRouter");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors("*"));

app.use(authRouter);
app.use(roleRouter);
app.use(uploadImageRouter);
app.use(containerRouter);

app.use("/status", (req,res) => {
    return res.send({message: "ALL GOOD"})
})

var port = process.env.PORT || 8020

mongoose.connect('mongodb://localhost:27017/portsystem', { useUnifiedTopology: true, useNewUrlParser: true,}, (err,res) => {
    if(err) {
        console.log(err);
    }else {
        console.log("CONNECTED TO DATABASE");
        initialRoles.initial();
    }
})

app.listen(port,(err) => {
    if(err) {
        console.log("There was an error");
        console.log(err)
    }else {
        console.log(`SERVER RUNNING ON PORT ${port}`)
    }
})