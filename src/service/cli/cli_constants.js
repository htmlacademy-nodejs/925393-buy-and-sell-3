"use strict";

const path = require(`path`);

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.DEFAULT_COUNT = 1;
module.exports.FILE_NAME = `mocks.json`;
module.exports.DEFAULT_PORT = 3000;

module.exports.USER_ARGV_INDEX = 2;
module.exports.EXIT_CODE = {
  error: 1,
  success: 0,
};

module.exports.MAX_ID_LENGTH = 6;
module.exports.MAX_COMMENTS = 4;

module.exports.API_PREFIX = `/api`;

module.exports.RESTRICT = {
  min: 1000,
  max: 100000
};
module.exports.DATA_PATH = {
  FILE_SENTENCES_PATH: path.join(process.env.NODE_PATH, `data`, `sentences.txt`),
  FILE_TITLES_PATH: path.join(process.env.NODE_PATH, `data`, `titles.txt`),
  FILE_CATEGORIES_PATH: path.join(process.env.NODE_PATH, `data`, `categories.txt`),
  FILE_COMMENTS_PATH: path.join(process.env.NODE_PATH, `data`, `comments.txt`)
};

module.exports.OFFER_TYPE = [
  `offer`,
  `sale`
];

module.exports.PICTURES_RESTRICT = {
  min: 1,
  max: 16
};

module.exports.ENV = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};
