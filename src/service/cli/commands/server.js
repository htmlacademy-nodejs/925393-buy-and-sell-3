"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT} = require("../cli_constants");

module.exports = {
  name: `--server`,
  async run(arg) {
    const [customPort] = arg;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer()
      .listen(port)
      .on('listening', err => {
        if (err) {
          console.error(`Ошибка при создании сервера`, err)
        } else {
          console.info(chalk.green(`Ожидаю соединений на ${port}`));
        }
      })
  }
}