import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
express.json();
helmet();
cors();
morgan("tiny");

app.listen(8080);
