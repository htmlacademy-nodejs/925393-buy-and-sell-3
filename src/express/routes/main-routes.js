"use strict";

const {Router} = require(`express`);

const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => {
  res.render('pages/main/main')
});

mainRoutes.get(`/login`, (req, res) => {
  res.render('pages/login/login')
});

mainRoutes.get(`/register`, (req, res) => {
  res.render('pages/sign-up/sign-up')
});

mainRoutes.get(`/search`, (req, res) => {
  res.render('pages/search-result/search-result')
});

module.exports = mainRoutes;
