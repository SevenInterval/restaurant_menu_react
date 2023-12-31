const express = require('express');
const cors = require('cors');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const initRoutes = require('./routes/index');

const env = process.env.NODE_ENV || 'development';
const app = express();

if (env === 'development') {
  app.use(cors());
}

app.use(morganLogger('dev'));
app.use(bodyParser.json({ limit: '600kb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '600kb'}));

initRoutes(app);

app.use(function (req, res, next) {
  const error = 'Here be dragons. Route not found';
  console.info(`404 error! ${error}`)
  res.status(404).send(error);
});

const port = 4011;

app.listen({port}, async () => {
  const baseUrl = `http://localhost:${port}`;

  console.log(`Server running at: \t @ ${baseUrl}/`);
});