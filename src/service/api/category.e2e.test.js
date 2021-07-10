"use strict";

const express = require(`express`);
const request = require(`supertest`);

const DataService = require(`../data-service/category_service`);
const category = require(`./category_routes`);
const {StatusCodes} = require(`http-status-codes`);

const mockData = getMockData();

const app = express();
app.use(express.json());
category(app, new DataService(mockData));


describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns list of 6 categories`, () => expect(response.body.length).toBe(6));
  test(`Category names are "Журналы", "Игры", "Животные"`, () => expect(response.body).toEqual(
      expect.arrayContaining([`Журналы`, `Игры`, `Животные`]),
  ));
});


function getMockData() {
  return [
    {
      "id": `nvK5fe`,
      "title": `Продам книги Стивена Кинга.`,
      "picture": `item07.jpg`,
      "description": `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать. Это настоящая находка для коллекционера!`,
      "type": `sale`,
      "sum": 20792,
      "comments": [
        {
          "id": `7pIkVt`,
          "text": `Неплохо, но дорого.`,
        },
      ],
      "category": [
        `Журналы`,
        `Игры`,
        `Разное`,
        `Животные`,
      ],
    },
    {
      "id": `zswLsU`,
      "title": `Продам коллекцию журналов «Огонёк».`,
      "picture": `item02.jpg`,
      "description": `Даю недельную гарантию. Пользовались бережно и только по большим праздникам. Кому нужен этот новый телефон, если тут такое... Эта вещь не так хрупка, как вам кажется. Продаю с болью в сердце...`,
      "type": `sale`,
      "sum": 19697,
      "comments": [
        {
          "id": `hqLu1_`,
          "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте?`,
        },
        {
          "id": `Dfi8hc`,
          "text": `С чем связана продажа? Почему так дешёво? А где блок питания?`,
        },
        {
          "id": `344xfs`,
          "text": `Неплохо, но дорого.`,
        },
        {
          "id": `Nqti1Q`,
          "text": `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`,
        },
      ],
      "category": [
        `Посуда`,
        `Телефоны`,
        `Журналы`,
      ],
    },
    {
      "id": `Bs3Ox4`,
      "title": `Отдам в хорошие руки подшивку «Мурзилка».`,
      "picture": `item06.jpg`,
      "description": `Если найдёте дешевле — сброшу цену. Не пытайтесь торговаться. Цену вещам я знаю. Если товар не понравится — верну всё до последней копейки. Мой дед не мог её сломать. Кажется, что это хрупкая вещь.`,
      "type": `sale`,
      "sum": 29090,
      "comments": [
        {
          "id": `w8boJj`,
          "text": `Совсем немного... Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`,
        },
        {
          "id": `fLpdyC`,
          "text": `Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?`,
        },
        {
          "id": `hNITIH`,
          "text": `Совсем немного... Неплохо, но дорого. Оплата наличными или перевод на карту?`,
        },
      ],
      "category": [
        `Разное`,
        `Игры`,
      ],
    },
    {
      "id": `YMdxID`,
      "title": `Куплю антиквариат.`,
      "picture": `item05.jpg`,
      "description": `Это настоящая находка для коллекционера! Товар - бомба! На вашем месте я бы не думал. Если найдёте дешевле — сброшу цену. Эта вещь не так хрупка, как вам кажется. Две страницы заляпаны свежим кофе.`,
      "type": `sale`,
      "sum": 47375,
      "comments": [
        {
          "id": `C3emU9`,
          "text": `С чем связана продажа? Почему так дешёво? Совсем немного... А сколько игр в комплекте?`,
        },
        {
          "id": `44pawh`,
          "text": `А сколько игр в комплекте? Неплохо, но дорого. Оплата наличными или перевод на карту?`,
        },
      ],
      "category": [
        `Посуда`,
        `Телефоны`,
        `Журналы`,
        `Животные`,
        `Разное`,
        `Игры`,
      ],
    },
  ];
}

