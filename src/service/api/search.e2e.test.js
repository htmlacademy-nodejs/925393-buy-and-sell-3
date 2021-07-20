"use strict";

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search_routes`);
const DataService = require(`../data-service/search_service`);
const {StatusCodes} = require(`http-status-codes`);

const mockData = getMockOffers();

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Продам советскую посуду`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`X2_pme`));

});

test(`API returns code 404 if nothing is found`, () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(StatusCodes.NOT_FOUND)
);

test(`API returns 400 when query string is absent`, () => request(app)
    .get(`/search`)
    .expect(StatusCodes.BAD_REQUEST)
);

function getMockOffers() {
  return [
    {
      "id": `X2_pme`,
      "title": `Продам советскую посуду. Почти не разбита.`,
      "picture": `item02.jpg`,
      "description": `При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе. Это настоящая находка для коллекционера! Даю недельную гарантию. Не пытайтесь торговаться. Цену вещам я знаю.`,
      "type": `sale`,
      "sum": 29213,
      "comments": [
        {
          "id": `Iqy0bG`,
          "text": `Оплата наличными или перевод на карту?`
        },
        {
          "id": `9KpnCQ`,
          "text": `Неплохо, но дорого. А где блок питания?`
        }
      ],
      "category": [
        `Игры`,
        `Телефоны`,
        `Журналы`,
        `Разное`,
        `Книги`,
        `Животные`
      ]
    },
    {
      "id": `sS_2LD`,
      "title": `Продам коллекцию журналов «Огонёк».`,
      "picture": `item12.jpg`,
      "description": `Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Даю недельную гарантию. Товар - бомба! На вашем месте я бы не думал. Пользовались бережно и только по большим праздникам.`,
      "type": `sale`,
      "sum": 9877,
      "comments": [
        {
          "id": `_JE583`,
          "text": `Вы что?! В магазине дешевле.`
        },
        {
          "id": `ZjsCWX`,
          "text": `Продаю в связи с переездом. Отрываю от сердца.`
        },
        {
          "id": `OnSQxn`,
          "text": `С чем связана продажа? Почему так дешёво?`
        }
      ],
      "category": [
        `Животные`,
        `Игры`,
        `Телефоны`,
        `Книги`
      ]
    },
    {
      "id": `7VEVUQ`,
      "title": `Продам отличную подборку фильмов на VHS.`,
      "picture": `item09.jpg`,
      "description": `Мой дед не мог её сломать. Две страницы заляпаны свежим кофе. Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Кому нужен этот новый телефон, если тут такое...`,
      "type": `sale`,
      "sum": 73374,
      "comments": [
        {
          "id": `VWfus1`,
          "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Совсем немного...`
        },
        {
          "id": `aFezdW`,
          "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Неплохо, но дорого.`
        },
        {
          "id": `uVYIno`,
          "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
        }
      ],
      "category": [
        `Игры`,
        `Разное`,
        `Посуда`,
        `Животные`,
        `Журналы`,
        `Телефоны`
      ]
    },
    {
      "id": `RAf-P7`,
      "title": `Отдам в хорошие руки подшивку «Мурзилка».`,
      "picture": `item02.jpg`,
      "description": `Эта вещь не так хрупка, как вам кажется. Товар в отличном состоянии. Продаю с болью в сердце... Есть косяки по товару, но за такую цену... Даю недельную гарантию.`,
      "type": `offer`,
      "sum": 47471,
      "comments": [
        {
          "id": `IsqeQ3`,
          "text": `Совсем немного... Неплохо, но дорого. Почему в таком ужасном состоянии?`
        },
        {
          "id": `6TEWfT`,
          "text": `Почему в таком ужасном состоянии?`
        },
        {
          "id": `yLU3fy`,
          "text": `Совсем немного...`
        }
      ],
      "category": [
        `Телефоны`,
        `Игры`,
        `Разное`,
        `Книги`,
        `Посуда`,
        `Животные`,
        `Журналы`
      ]
    },
    {
      "id": `Nq-fDG`,
      "title": `Куплю породистого кота.`,
      "picture": `item04.jpg`,
      "description": `Товар - бомба! На вашем месте я бы не думал. Если найдёте дешевле — сброшу цену. Мой дед не мог её сломать. Товар в отличном состоянии. Таких предложений больше нет!`,
      "type": `sale`,
      "sum": 61717,
      "comments": [
        {
          "id": `0-gsSx`,
          "text": `Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?`
        },
        {
          "id": `TDhaQ_`,
          "text": `С чем связана продажа? Почему так дешёво? А где блок питания? Совсем немного...`
        }
      ],
      "category": [
        `Игры`
      ]
    }
  ];

}
