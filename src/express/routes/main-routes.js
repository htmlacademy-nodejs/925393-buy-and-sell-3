"use strict";

const {Router} = require(`express`);

const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => console.log(`main`))
mainRoutes.get(`/login`, (req, res) => console.log(`/login`))
mainRoutes.get(`/register`, (req, res) => console.log(`/register`))
mainRoutes.get(`/search`, (req, res) => console.log(`/search`))

module.exports = mainRoutes;
