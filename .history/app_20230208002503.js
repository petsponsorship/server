import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/posts", postsRoute);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080);
