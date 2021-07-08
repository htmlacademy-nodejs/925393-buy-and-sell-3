"use strict";

const {StatusCodes} = require(`http-status-codes`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(`Bad request: в объекте запроса определены не все поля`);
  }

  next();
  return null;
};
