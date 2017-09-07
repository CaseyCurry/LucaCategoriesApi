"use strict";

const app = require("express")();
const helmet = require("helmet");
const cors = require("cors");
const categories = require("./categories.json");

app.use(helmet());

app.use(cors({
  origin: "*"
}));

app.get("/api/categories", (request, response) => {
  response
    .status(200)
    .json(categories);
  response.end();
});

// Express requires the signature to include all four parameters
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response
    .status(500)
    .send(error);
  response.end();
});

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
