// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;

// HTTP request logger
app.use(morgan('tiny'));

app.listen(PORT, function () {
    require('mongoose').connect("mongodb+srv://admin:O7dsTH6x6KOIdw1F@boersenanalystencluster.ie2ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Server started successfully on port ${PORT}`);
        }).catch((error) => {
            console.log(`DB error: ${error.message}`);
        });
});

// Routes
app.get('/userprofile', (req, res) => {
    const data = {
        username: "Marci",
        age: 26,
    };
    res.json(data);
})