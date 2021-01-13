"use strict";

const version = require('./version');
const help = require('./help');
const generate = require('./generate');

const cli = {
  [version.name]: version,          // "--version": version
  [help.name]: help,                // "--help": help
  [generate.name]: generate         // "--generate": generate
}

module.exports = {
  cli
}
