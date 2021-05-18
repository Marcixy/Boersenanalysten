// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = "mongodb+srv://admin:O7dsTH6x6KOIdw1F@boersenanalystencluster.ie2ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const routes = require('./routes/api');

// HTTP request logger
app.use(morgan('tiny'));
app.use('/', routes);

app.listen(PORT, function () {
    require('mongoose').connect(MONGODB_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Server started successfully on port ${PORT}.`);
        }).catch((error) => {
            console.log(`DB error: ${error.message}`);
        });
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is successfully connected.");
})

/*const newUser = new User(data);
newUser.save((error) => {
    if (error) {
        console.log("Benutzer konnte nicht erstellt werden.");
    } else {
        console.log("Benutzer wurde erfolgreich erstellt.");
    }
});*/