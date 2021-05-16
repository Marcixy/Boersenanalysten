// jshint esversion:6
const express = require("express");

const app = express();

app.listen(3000, function () {
    require('mongoose').connect("mongodb+srv://admin:O7dsTH6x6KOIdw1F@boersenanalystencluster.ie2ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Server started successfully on port 3000");
        }).catch((error) => {
            console.log(`DB error: ${error.message}`);
        });
})