const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport')
const apiRouter = require('./routes/api');

require('dotenv').config();
require('./auth/passport');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// app.use(function(req, res, next) {
//   const err = new Error('Not found');
//   err.status = 404;
//   next(err)
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json(err);
// });

app.listen(3000, console.log('Server running on port 3000!'));

app.use('/api', apiRouter);

