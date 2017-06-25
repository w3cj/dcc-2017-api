const fs = require('fs');
const morgan = require('morgan');
const express = require('express');

const app = express();

const schedule = require('./api/schedule');

app.use(morgan('tiny'));

app.use('/api/schedule', schedule);

app.use((req, res, next) => {
  res.status(404);
  next(new Error('Not Found'));
});

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV == 'production' ? {} : err.stack
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
