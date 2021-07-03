"use strict";

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const categoryRoute = new Router();

module.exports = (app, categoryService) => {
  app.use(`/category`, categoryRoute);

  categoryRoute.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(StatusCodes.OK)
      .json(categories);
  });
};
