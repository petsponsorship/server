import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import postsRoute from "./router/posts.js";
import "express-async-errors";
import { sequelize } from "./db/database.js";
import { config } from "./config.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/posts", postsRoute);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  console.log(`Server is started... ${new Date()}`);
  app.listen(config.port);
});
