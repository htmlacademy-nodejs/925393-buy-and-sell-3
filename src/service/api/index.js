"use strict";

const Router = require(`express`);
const offersRoutes = require(`../api/offers_routes`);
const categoryRoutes = require(`../api/category_routes`);
const searchRoutes = require(`../api/search_routes`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  OffersService,
  CommentsService,
  SearchService
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  offersRoutes(app, new OffersService(mockData), new CommentsService(mockData));
  categoryRoutes(app, new CategoryService(mockData));
  searchRoutes(app, new SearchService(mockData));
})();

module.exports = app;

