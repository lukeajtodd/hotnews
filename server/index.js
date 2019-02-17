require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const dynamoose = require('dynamoose');
const cors = require('cors');
// require('./config/dynamoose')(dynamoose);

// const auth = require('./routes/api/auth');
// const jokes = require('./routes/api/jokes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

// app.use('/api/jokes', jokes);
// app.use('/api/favourites', favourites);

module.exports = app;
