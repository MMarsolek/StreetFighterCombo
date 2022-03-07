const path = require('path');
const oAuth = require('./utils/token')
const express = require('express');
const session = require('express-session');

const routes = require('./controller');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'ThisIsOutSecret',
    cookie: {maxAge: 1000*60*2},
    resave : false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

oAuth.setKeys();

app.use(session(sess)); 

// Express middleware for processing post and put requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Setting up the public directory to handle static requests (TODO: will we actually need this?)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Syncs sequelize before setting the server to listen
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log(`Currently listening on ${PORT}`));
});