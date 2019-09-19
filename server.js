
const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    hostname = process.env.HOSTNAME || 'localhost'

const router = express.Router();
const appRoot = require('app-root-path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const morgan = require('morgan');

const winston = require("./api/config/logger");
const userRoute = require("./api/routers/userRoute");
const adminRoute = require("./api/routers/adminRoute");
const clubRoute = require("./api/routers/clubRoute");
const memberRoute = require("./api/routers/memberRoute");


app.use(cors());
app.options('*', cors())
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('combined', {
    stream: winston.stream
}));

// Authentication middleware
require(`${appRoot}/api/middleware/authentication/passport`)

// init route
userRoute(router);
adminRoute(router);
clubRoute(router);
memberRoute(router);

app.use(router);

app.listen(port, () => {
    console.info('Tradedepot API started on '+ hostname+ ':' + port);
});
