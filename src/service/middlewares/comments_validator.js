"use strict";

const {StatusCodes} = require(`http-status-codes`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(`Bad request: в объекте запроса определены не все поля`);
  }

  next();
  return null;
};
