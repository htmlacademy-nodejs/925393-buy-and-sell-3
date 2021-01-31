"use strict";

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => console.log(`/my`))
myRoutes.get(`/comments`, (req, res) => console.log(`/my/comments`))

module.exports = myRoutes;
