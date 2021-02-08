"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const path = require(`path`);
const fs = require(`fs`).promises;
const {StatusCodes} = require(`http-status-codes`);
const {DEFAULT_PORT, FILE_NAME} = require(`../cli_constants`);

const sendResponse = (res, statusCode, val) => {
  const template = `
   <!Doctype html>
      <html lang="ru">
      <head>
        <title>Учебный проект по Node.js</title>
      </head>
      <body>${val}</body>
    </html>
  `;
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const pathToReadFile = path.join(process.env.NODE_PATH, `${FILE_NAME}`);
        console.log(process.execPath);
        const fileContent = await fs.readFile(pathToReadFile);
        const mocks = JSON.parse(fileContent);

        const val = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, StatusCodes.OK, `<ul>${val}</ul>`);
      } catch (err) {
        sendResponse(res, StatusCodes.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, StatusCodes.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  async run(arg) {
    const [customPort] = arg;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(`Ошибка при создании сервера`, err);
        } else {
          console.info(chalk.green(`Ожидаю соединений на ${port}`));
        }
      });
  }
};
