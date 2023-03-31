import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import schedule from "node-schedule";
import postsRouter from "./router/posts.js";
import editRouter from "./router/edit.js";
import authRouter from "./router/auth.js";
import supportRouter from "./router/support.js";
import likeRouter from "./router/like.js";
import myRouter from "./router/my.js";
import "express-async-errors";
import { sequelize } from "./db/database.js";
import { config } from "./config.js";
import { updateExpired } from "./data/post.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

schedule.scheduleJob("1 1 0 * * *", () => updateExpired());
// schedule.scheduleJob("5 * * * * *", () => console.log("!!!매 5초마다 실행"));
// schedule.scheduleJob("5 * * * * *", () => updateExpired());
// schedule.scheduleJob("1 1 0 * * *", () => updateExpired());

app.use("/edit", editRouter);
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/support", supportRouter);
app.use("/like", likeRouter);
app.use("/my", myRouter);

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
