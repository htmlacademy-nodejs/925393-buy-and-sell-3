"use strict";

const {Router} = require(`express`);

const offersRoutes = new Router();

offersRoutes.get(`/add`, (req, res) => console.log(`offers/add`));
offersRoutes.get(`/category/:id`, (req, res) => console.log(`offers/category/:id`));
offersRoutes.get(`/edit/:id`, (req, res) => console.log(`/edit/:id`));
offersRoutes.get(`/:id`, (req, res) => console.log(`offers/:id`));

module.exports = offersRoutes;
