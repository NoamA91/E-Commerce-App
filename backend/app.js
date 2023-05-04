// modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");


const usersRouter = require('./routes/users_router');

const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        credentials: true,
        origin: "*",
        optionsSuccessStatus: 200,
    })
);

// routes
app.use('/users', usersRouter);

module.exports = app;
