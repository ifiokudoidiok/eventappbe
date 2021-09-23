const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const eventRouter = require('./events/eventRouter');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/events', logger, eventRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


// custom middleware

function logger(req, res, next) {
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
          'Origin',
      )}`,
  );

  next();
}

module.exports = server;
