require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const tokenRoute = require('./routes/tokenRoute.js');
const scheduledUpdateTokens = require('./scheduled/updateTokens.js')

//initialize express app
const app = express();

//config object
const cfg = {
    port: process.env.PORT || 5000
}

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(tokenRoute);

//cronjob for update the tokens price every 30 minutes
scheduledUpdateTokens();

//starting server
app.listen(cfg.port, () => console.log(`Server up at http://localhost:${cfg.port}`));