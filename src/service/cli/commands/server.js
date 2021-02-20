"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const express = require(`express`);
const {Router} = require(`express`);

const {StatusCodes} = require(`http-status-codes`);
const {DEFAULT_PORT, FILE_NAME} = require(`../cli_constants`);

const app = express();

const offersRoute = new Router();

offersRoute.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.send(mocks);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([]);
  }
})

app.use(express.json());

app.use(`/offers`, offersRoute);

app.use((req, res) => res
  .status(StatusCodes.NOT_FOUND)
  .send(`Not found`))

module.exports = {
  name: `--server`,
  async run(arg) {
    const [customPort] = arg;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(`Сервер принимает подключения на ${chalk.blue(port)})`)
    });
  }
};
