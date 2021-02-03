"use strict";

const {Router} = require(`express`);

const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => {
  res.render('pages/main/index', {
    title: 'rvrrvrv'
  })
  console.log(`main`)
});
mainRoutes.get(`/login`, (req, res) => {
  res.render('pages/login/login')
  console.log(`/login`)
});
mainRoutes.get(`/register`, (req, res) => console.log(`/register`));
mainRoutes.get(`/search`, (req, res) => console.log(`/search`));

module.exports = mainRoutes;
