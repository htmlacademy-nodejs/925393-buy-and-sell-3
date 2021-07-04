"use strict";

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    const offers = this._offers;
    const resultArray = [];

    offers.forEach((offer) => {
      const title = offer.title;
      if (title.indexOf(searchText) >= 0) {
        resultArray.push(offer);
      }
    });
    return resultArray;
  }

}

module.exports = SearchService;
