"use strict";

const Router = require(`express`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    try {
      const {query = ``} = req.query;
      if (!query) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(getReasonPhrase(StatusCodes.BAD_REQUEST));
      }
      const searchResults = service.findAll(query);
      const searchStatus = searchResults.length > 0 ? StatusCodes.OK : StatusCodes.NOT_FOUND;

      res
        .status(searchStatus)
        .json(searchResults);
    } catch (e) {
      throw new Error(e);
    }
  });
};
