"use strict";

const express = require(`express`);
const routes = require(`./routes`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, routes.mainRoutes);
app.use(`/offers`, routes.offersRoutes);
app.use(`/my`, routes.myRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
