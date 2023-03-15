import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import usersRouter from "./routes/user.mjs";
import userRouter from "./routes/user.mjs";
import { engine } from "express-handlebars";
import dashboardRouter from "./routes/dashboard.mjs";
import VIEWS from "./views/view_catalog.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { randomUUID } from 'crypto'
import postRouter from "./routes/post.mjs";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const middleWare = express.Router();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
middleWare.use(
  session({
    secret: "supersecretkey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, secure: true },
    resave: false,
  }),
  (req, res, next) => {
    req.session.user = null;
    next();
  }
);

app.get("/", middleWare, (req, res, next) => {
  console.log("fucking shit", req.session);
  if (req.session.user !== null) {
    res.render(VIEWS.dashboard.file, {user: req.session.user});
  } else {
    console.log("not true");
    res.render(VIEWS.landing.file);
  }
});

app.use("/posts", middleWare, postRouter);

app.use("/users", middleWare, userRouter);

app.use("/dashboard", middleWare, dashboardRouter);

app.listen(8080);
