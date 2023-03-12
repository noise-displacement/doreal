import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import usersRouter from "./routes/user.mjs";
import userRouter from "./routes/user.mjs";
import { engine } from "express-handlebars";
import dashboardRouter from "./routes/dashboard.mjs";
import VIEWS from "./views/view_catalog.mjs";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

app.engine('handlebars', engine());
app.set("view engine", "handlebars");
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let loggedIn = false;

app.use(cookieParser());

app.get("/", (req, res, next) => {
  console.log(req.cookies);
  if(loggedIn) {
    res.render(VIEWS.dashboard.file);
  } else {
    res.render(VIEWS.login.file);
  }
});

app.get("/posts", (req, res, next) => {
  res.json(posts);
});

app.use("/users", userRouter);

app.use("/dashboard", dashboardRouter);

app.listen(8080);
