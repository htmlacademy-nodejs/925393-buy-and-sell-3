"use strict";

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {StatusCodes} = require(`http-status-codes`);
const {FILE_NAME} = require(`./cli_constants`)

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

module.exports = {
  offersRoute
}
