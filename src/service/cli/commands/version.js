'use strict';

const chalk = require(`chalk`);

const {version} = require(`../../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(version));
  }
};

