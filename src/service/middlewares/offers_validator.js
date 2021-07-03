"use strict";
const {StatusCodes} = require(`http-status-codes`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  console.log(req.body);
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(StatusCodes.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
