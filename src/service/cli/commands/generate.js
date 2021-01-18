"use strict";

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const util = require(`util`);

const {TITLES, SENTENCES, CATEGORIES, OFFER_TYPE} = require(`../data_for_generate.js`);
const {getRandomInt, shuffle} = require(`../../../utils`);
const {DEFAULT_COUNT, RESTRICT, PICTURES_RESTRICT, FILE_NAME} = require(`../cli_constants`);

const getPictureName = (num) => `item${num.toString().padStart(2, `0`)}.jpg`;

const generateOffers = (count) => {
  const arr = Array(count).fill({});

  return arr.map(() => (
    {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureName(getRandomInt(PICTURES_RESTRICT.min, PICTURES_RESTRICT.max)),
      description: shuffle(SENTENCES).slice(0, 5).join(` `),
      type: OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length - 1)],
      sum: getRandomInt(RESTRICT.min, RESTRICT.max),
      get category() {
        const mixedCategories = shuffle(CATEGORIES);
        return Array(getRandomInt(1, CATEGORIES.length)).fill({}).map((i, idx) => mixedCategories[idx]);
      }
    }
  ));
};


module.exports = {
  name: `--generate`,
  async run(arg) {
    const [count] = arg;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    const pathUploadData = path.join(process.cwd(), `../../${FILE_NAME}`);

    // Обернули fs.writeFile в promise
    const write = util.promisify(fs.writeFile);

    try {
      await write(pathUploadData, content);
      console.log(chalk.green(`Данные успешно сгенерированы!  Файл находиться тут --> ${pathUploadData}`));
    } catch (err) {
      console.log(chalk.red(`Ошибка! Не удалось сгенерировать данные!`));
    }
  }
};
