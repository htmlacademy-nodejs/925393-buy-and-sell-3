"use strict";

const {Router} = require(`express`);
const offersRoutes = require(`../api/offers_routes`);
const categoryRoutes = require(`../api/category_routes`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  OffersService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  offersRoutes(app, new OffersService(mockData));
  categoryRoutes(app, new CategoryService(mockData));
})();

module.exports = app;

