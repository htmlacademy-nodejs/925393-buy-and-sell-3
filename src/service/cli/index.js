"use strict";

const version = require(`./commands/version`);
const help = require(`./commands/help`);
const generate = require(`./commands/generate`);
const server = require(`./commands/server`);

module.exports.cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [server.name]: server

};
