"use strict";

const path = require(`path`);
const express = require(`express`);
const routes = require(`./routes`);

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

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
