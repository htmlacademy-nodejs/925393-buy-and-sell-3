"use strict";

const Router = require(`express`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const offersValidator = require(`../middlewares/offers_validator`);
const commentsValidator = require(`../middlewares/comments_validator`);
const offersExists = require(`../middlewares/offers_exists`);

module.exports = (app, offersService, commentsService) => {
  const offersRoute = new Router();

  app.use(`/offers`, offersRoute);

  // OFFERS_ENDPOINTS

  // GET Запросы //

  offersRoute.get(`/`, (req, res) => {
    try {
      const offers = offersService.findAll();
      res
        .status(StatusCodes.OK)
        .json(offers);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  offersRoute.get(`/:offerId`, (req, res) => {
    try {
      const {offerId} = req.params;
      const offer = offersService.findOne(offerId);

      if (!offer) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(`Not found with ${offerId}`);
      }
      res
        .status(StatusCodes.OK)
        .json(offer);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  offersRoute.get(`/:offerId/comments`, offersExists(offersService), (req, res) => {
    try {
      const {offerId} = req.locals;
      const comments = commentsService.findAll(offerId);

      res
        .status(StatusCodes.OK)
        .json(comments);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  // POST запросы //

  offersRoute.post(`/`, offersValidator, (req, res) => {
    try {
      const offer = offersService.create(req.body);
      res
        .status(StatusCodes.CREATED)
        .json(offer);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  offersRoute.post(`/:offerId/comments`, [offersExists(offersService), commentsValidator], (req, res) => {
    try {
      const {offerId} = req.params;
      const comment = commentsService.create(offerId, req.body);
      res
        .status(StatusCodes.CREATED)
        .json(comment);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  // PUT запросы //

  offersRoute.put(`/:offerId`, offersValidator, (req, res) => {
    try {
      const {offerId} = req.params;

      const updated = offersService.update(offerId, req.body);
      if (!updated) {
        res.
          status(StatusCodes.NOT_FOUND)
          .json(getReasonPhrase(StatusCodes.NOT_FOUND));
      }
      res
        .status(StatusCodes.OK)
        .json(updated);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  // DELETE запросы //

  offersRoute.delete(`/:offerId`, (req, res) => {
    try {
      const {offerId} = req.params;

      const offer = offersService.drop(offerId);

      if (!offer) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(getReasonPhrase(StatusCodes.NOT_FOUND));
      }
      res
        .status(StatusCodes.OK)
        .json(offer);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });

  offersRoute.delete(`/:offerId/comments/:commentId`, offersExists(offersService), (req, res) => {
    try {
      const {commentId} = req.params;
      const {offer} = res.locals;
      const deleted = commentsService.drop(commentId, offer);

      if (!deleted) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(getReasonPhrase(StatusCodes.NOT_FOUND));
      }
      res
        .status(StatusCodes.OK)
        .json(deleted);
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
      throw new Error(e);
    }
  });
};
