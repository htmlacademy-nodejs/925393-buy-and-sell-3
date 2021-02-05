"use strict";

const {Router} = require(`express`);
const offersRoutes = new Router();

offersRoutes.get(`/add`, (req, res) => {
  res.render(`pages/new-ticket/new-ticket`);
});

offersRoutes.get(`/category/:id`, (req, res) => {
  res.render(`pages/category/category`);
});

offersRoutes.get(`/edit/:id`, (req, res) => {
  res.render(`pages/ticket-edit/ticket-edit`);
  console.log(`/edit/:id`);
});

offersRoutes.get(`/:id`, (req, res) => {
  res.render(`pages/ticket/ticket`);
});

module.exports = offersRoutes;
