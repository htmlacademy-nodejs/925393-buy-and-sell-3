"use strict";

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => {
  res.render('pages/my-tickets/my-tickets')
});

myRoutes.get(`/comments`, (req, res) => {
  res.render('pages/comments/comments')
});

module.exports = myRoutes;
