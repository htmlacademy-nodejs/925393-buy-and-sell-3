"use strict";

const express = require(`express`);
const apiRoutes = require(`../../api`);
const {getLogger} = require(`../../lib/logger`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const {DEFAULT_PORT, API_PREFIX} = require(`../cli_constants`);

const logger = getLogger({name: `api`});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});


app.use(API_PREFIX, apiRoutes);

app.use((err, req, res, next) => {
  res
    .status(500)
    .json(`${getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)}: ${err.message}`);
  logger.error(`An error occurred on processing request: ${err.message}`);
  next();
});

app.use((req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

module.exports = {
  name: `--server`,
  async run(arg) {
    const [customPort] = arg;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    try {

      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (e) {
      logger.error(`An error occurred: ${e.message}`);
      process.exit(1);
    }


  }
};
