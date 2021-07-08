"use strict";

const chalk = require(`chalk`);
const express = require(`express`);
const apiRoutes = require(`../../api`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const {DEFAULT_PORT, API_PREFIX} = require(`../cli_constants`);

const app = express();

app.use(express.json());

app.use(API_PREFIX, apiRoutes);

app.use((err, req, res, next) => {
  res
    .status(500)
    .json(`${getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)}: ${err.message}`);

  next();
});

app.use((req, res) => res
  .status(StatusCodes.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(arg) {
    const [customPort] = arg;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(`Сервер принимает подключения на ${chalk.blue(port)}`);
    });
  }
};
