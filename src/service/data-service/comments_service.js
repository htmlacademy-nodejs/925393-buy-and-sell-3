"use strict";

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../cli/cli_constants`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }
  create(offerId, comment) {
    const offer = this._offers.find((item) => item.id === offerId);
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH)
    }, comment);
    offer.comments.push(newComment);
    return newComment;
  }

  findAll(offerId) {
    const offer = this._offers.find((item) => item.id === offerId);
    return offer.comments;
  }
}

module.exports = CommentService;
