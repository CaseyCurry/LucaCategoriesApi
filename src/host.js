"use strict";

const app = require("express")();
const apiInitializer = require("luca-api-initializer");
const categories = require("./categories.json");

const registerRoutes = (app) => {
  app.get("/api/categories", (request, response) => {
    response
      .status(200)
      .json(categories);
    response.end();
  });
};

apiInitializer.initialize(app, "categories-api", registerRoutes);
