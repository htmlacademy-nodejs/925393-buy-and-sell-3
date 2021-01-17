"use strict";

const version = require(`./commands/version`);
const help = require(`./commands/help`);
const generate = require(`./commands/generate`);

module.exports.cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate
};
