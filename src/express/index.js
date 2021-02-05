"use strict";

const path = require(`path`);
const express = require(`express`);
const routes = require(`./routes`);
const {StatusCodes} = require("http-status-codes");

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = path.resolve(__dirname, `public`)
const TEMPLATES_DIR = path.resolve(__dirname, `templates`)
console.log(PUBLIC_DIR)

const app = express();

//middleware
app.use(express.static(PUBLIC_DIR))
app.set(`views`, TEMPLATES_DIR)
app.set(`view engine`, `pug`);

app.use(`/`, routes.mainRoutes);
app.use(`/offers`, routes.offersRoutes);
app.use(`/my`, routes.myRoutes);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).render('pages/errors/400/400')
});

app.use((err, req, res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('pages/errors/500/500')
})



app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
