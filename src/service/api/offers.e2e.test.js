"use strict";

const express = require(`express`);
const request = require(`supertest`);

const {StatusCodes} = require(`http-status-codes`);
const offer = require(`./offers_routes`);

const OfferService = require(`../data-service/offers_service`);
const CommentsService = require(`../data-service/comments_service`);

const mockData = getMockOffers();

const createAPI = () => {
  const app = express();
  app.use(express.json());
  const cloneData = JSON.parse(JSON.stringify(mockData));
  offer(app, new OfferService(cloneData), new CommentsService(cloneData));
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));
  test(`First offer's id equals "bUAlOA"`, () => expect(response.body[0].id).toBe(`z9XIQ7`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/z9XIQ7`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Offer's title is "Отдам в хорошие руки подшивку «Мурзилка»."`, () => expect(response.body.title)
    .toBe(`Отдам в хорошие руки подшивку «Мурзилка».`));

});

test(`API returns code 404 if nothing is found offer ID`, () => {
  const app = createAPI();

  return request(app)
    .get(`/offers/z9XIQ`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`API creates an offer if data is valid`, () => {
  const app = createAPI();

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(StatusCodes.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6)),
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const app = createAPI();

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(StatusCodes.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const app = createAPI();
  let response;

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/z9XIQ7`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offer is really changed`, () => request(app)
    .get(`/offers/z9XIQ7`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`)));
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404,
  };

  return request(app)
    .put(`/offers/z9X2wewe`)
    .send(validOffer)
    .expect(StatusCodes.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`,
  };

  return request(app)
    .put(`/offers/z9XIQ7`)
    .send(invalidOffer)
    .expect(StatusCodes.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/z9XIQ7`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`z9XIQ7`));
  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/z9XIQ7/comments`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));
  test(`First comment's text is "Неплохо, но дорого. Вы что?! В магазине дешевле."`, () => {
    expect(response.body[0].text)
      .toBe(`Неплохо, но дорого. Вы что?! В магазине дешевле.`);
  });
});

test(`Status code 404 if nothing is found offer ID for comments`, () => {
  const app = createAPI();

  return request(app)
    .get(`/offers/NOEXST/comments`)
    .expect(StatusCodes.NOT_FOUND);
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;

  const newComment = {
    text: `Новый валидный коммент`,
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/z9XIQ7/comments`)
      .send(newComment);
  });
  test(`Status code 201`, () => expect(response.statusCode).toBe(StatusCodes.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers/z9XIQ7/comments`)
    .expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API creates a comment if data is invalid`, () => {
  const app = createAPI();
  let response;

  const newComment = {
    invalidText: `Новый Невалидный коммент`,
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/z9XIQ7/comments`)
      .send(newComment);
  });
  test(`Status code 400`, () => expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST));
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(StatusCodes.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/z9XIQ7/comments/NOEXST`)
    .expect(StatusCodes.NOT_FOUND);
});

test(`API refuses to delete non-existent offer for comments`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST/comments/hGJ7J5`)
    .expect(StatusCodes.NOT_FOUND);
});

function getMockOffers() {
  return [
    {
      "id": `z9XIQ7`,
      "title": `Отдам в хорошие руки подшивку «Мурзилка».`,
      "picture": `item08.jpg`,
      "description": `Есть косяки по товару, но за такую цену... Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки. Эта вещь не так хрупка, как вам кажется. Кажется, что это хрупкая вещь.`,
      "type": `offer`,
      "sum": 14872,
      "comments": [
        {
          "id": `hGJ7J5`,
          "text": `Неплохо, но дорого. Вы что?! В магазине дешевле.`,
        },
        {
          "id": `oXRrEi`,
          "text": `Почему в таком ужасном состоянии?`,
        },
        {
          "id": `R-2J8j`,
          "text": `Оплата наличными или перевод на карту? Совсем немного...`,
        },
      ],
      "category": [
        `Игры`,
        `Книги`,
        `Журналы`,
        `Посуда`,
        `Разное`,
      ],
    },
    {
      "id": `JYj1kx`,
      "title": `Продам мотоцикл «Honda»`,
      "picture": `item03.jpg`,
      "description": `Товар в отличном состоянии. Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города. Кому нужен этот новый телефон, если тут такое... Товар - бомба! На вашем месте я бы не думал.`,
      "type": `sale`,
      "sum": 52170,
      "comments": [
        {
          "id": `OaISgV`,
          "text": `С чем связана продажа? Почему так дешёво?`,
        },
        {
          "id": `XJXlni`,
          "text": `А где блок питания? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`,
        },
      ],
      "category": [
        `Книги`,
        `Разное`,
        `Телефоны`,
        `Игры`,
        `Животные`,
        `Посуда`,
      ],
    },
    {
      "id": `GbHLRV`,
      "title": `Куплю советские монеты.Недорого.`,
      "picture": `item12.jpg`,
      "description": `Эта вещь не так хрупка, как вам кажется. Даю недельную гарантию. Это настоящая находка для коллекционера! Товар - бомба! На вашем месте я бы не думал. Продаю с болью в сердце...`,
      "type": `offer`,
      "sum": 41213,
      "comments": [
        {
          "id": `jEEjew`,
          "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А сколько игр в комплекте?`,
        },
        {
          "id": `UjpTGB`,
          "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте? Почему в таком ужасном состоянии?`,
        },
        {
          "id": `6-2LWi`,
          "text": `Совсем немного...`,
        },
        {
          "id": `YLq2cI`,
          "text": `А сколько игр в комплекте? Оплата наличными или перевод на карту? Совсем немного...`,
        },
      ],
      "category": [
        `Телефоны`,
      ],
    },
    {
      "id": `8AxcEL`,
      "title": `Куплю советские монеты.Недорого.`,
      "picture": `item09.jpg`,
      "description": `Кажется, что это хрупкая вещь. Продаю с болью в сердце... Даю недельную гарантию. Есть косяки по товару, но за такую цену... Мой дед не мог её сломать.`,
      "type": `offer`,
      "sum": 13094,
      "comments": [
        {
          "id": `89ocoW`,
          "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`,
        },
      ],
      "category": [
        `Книги`,
        `Посуда`,
        `Разное`,
        `Животные`,
        `Игры`,
        `Журналы`,
      ],
    },
    {
      "id": `mxr-xr`,
      "title": `Продам советскую посуду. Почти не разбита.`,
      "picture": `item06.jpg`,
      "description": `При покупке с меня бесплатная доставка в черте города. Мой дед не мог её сломать. Это настоящая находка для коллекционера! Эта вещь не так хрупка, как вам кажется. Таких предложений больше нет!`,
      "type": `sale`,
      "sum": 17691,
      "comments": [
        {
          "id": `u59tKb`,
          "text": `Оплата наличными или перевод на карту?`,
        },
        {
          "id": `l7f7PD`,
          "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`,
        },
        {
          "id": `ghhrvQ`,
          "text": `А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Совсем немного...`,
        },
      ],
      "category": [
        `Журналы`,
      ],
    },
  ];
}
