const path = require('path');
const oAuth = require('./utils/token')
const express = require('express');
const session = require('express-session');
const routes = require('./controller');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Our Super Secret Password',
    cookie: {maxAge: 1000*60*10},
    resave : false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

oAuth.setKeys();

app.use(session(sess)); 

app.use(express.json());
app.use(express.urlencoded({extended:true})),
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log(`Currently listening on ${PORT}`));
});