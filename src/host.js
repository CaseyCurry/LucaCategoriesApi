import express from "express";
import helmet from "helmet";
import cors from "cors";
import categories from "./categories";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*"
  })
);

app.get("/api/categories", async (request, response) => {
  response.status(200).json(categories);
  response.end();
});

// Express requires the signature to include all four parameters
app.use((error, request, response, next) => {
  response.status(500).send(error);
  response.end();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `${process.env.npm_package_name} is ready at port ${port}, captain!`
  );
});
