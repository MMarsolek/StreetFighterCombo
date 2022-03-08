const path = require('path');
const oAuth = require('./utils/token')
const express = require('express');
// This is a necessary bit of middleware to allow our front end to access this api
const cors = require('cors');

const routes = require('./controller');
const sequelize = require('./config/connection');

// Sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

oAuth.setKeys();

// Express middleware for processing post and put requests
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(routes);

// Syncs sequelize before setting the server to listen
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log(`Currently listening on ${PORT}`));
});