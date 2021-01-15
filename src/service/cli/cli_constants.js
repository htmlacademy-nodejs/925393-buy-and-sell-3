"use strict";

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.DEFAULT_COUNT = 1;
module.exports.FILE_NAME = `mocks.json`;

module.exports.USER_ARGV_INDEX = 2;
module.exports.EXIT_CODE = {
  error: 1,
  success: 0,
};

module.exports.RESTRICT = {
  min: 1000,
  max: 100000
};

module.exports.PICTURES_RESTRICT = {
  min: 1,
  max: 16
};
