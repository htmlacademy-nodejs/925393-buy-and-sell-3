"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle} = require(`../../../utils`);
const {DEFAULT_COUNT, RESTRICT, PICTURES_RESTRICT, FILE_NAME, DATA_PATH, OFFER_TYPE, MAX_ID_LENGTH} = require(`../cli_constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(`
    Во время чтения файла произошла ошибка - ${err}.
    `));
    return undefined;
  }
};

const getPictureName = (num) => `item${num.toString().padStart(2, `0`)}.jpg`;

const generateOffers = (count, titles, categories, sentences) => {
  const arr = Array(count).fill({});

  return arr.map(() => (
    {
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: getPictureName(getRandomInt(PICTURES_RESTRICT.min, PICTURES_RESTRICT.max)),
      description: shuffle(sentences).slice(0, 5).join(` `),
      type: OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length - 1)],
      sum: getRandomInt(RESTRICT.min, RESTRICT.max),
      get category() {
        const mixedCategories = shuffle(categories);
        return Array(getRandomInt(1, categories.length)).fill({}).map((i, idx) => mixedCategories[idx]);
      }
    }
  ));
};

module.exports = {
  name: `--generate`,
  async run(arg) {
    const [count] = arg;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const sentences = await readContent(DATA_PATH.FILE_SENTENCES_PATH);
    const titles = await readContent(DATA_PATH.FILE_TITLES_PATH);
    const categories = await readContent(DATA_PATH.FILE_CATEGORIES_PATH);

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    const pathUpload = path.join(`${process.env.NODE_PATH}`, `${FILE_NAME}`);

    try {
      await fs.writeFile(pathUpload, content);
      console.log(chalk.green(`Данные успешно сгенерированы!  Файл находиться тут --> ${path.resolve(pathUpload)}`));
    } catch (err) {
      console.log(chalk.red(`Ошибка! Не удалось сгенерировать данные!`));
    }
  }
};
