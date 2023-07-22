const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');

const app = express();

const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const setupAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log("Listening on Port 3002");

        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
    })
}

setupAndStartServer();