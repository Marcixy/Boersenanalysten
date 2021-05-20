// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = "mongodb+srv://admin:O7dsTH6x6KOIdw1F@boersenanalystencluster.ie2ek.mongodb.net/boersenanalystenDB?retryWrites=true&w=majority";

const routes = require('./routes/api');

app.use(cors());
// HTTP request logger
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes must declared finally
app.use('/', routes);

app.listen(PORT, function () {
    require('mongoose').connect(MONGODB_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Server started successfully on port ${PORT}`);
        }).catch((error) => {
            console.log(`DB error: ${error.message}`);
        });
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is successfully connected.");
})