import express from "express";
//import "dotenv/config";
import mongoose from "mongoose";
//import usersRouter from "./routes/user.mjs";
import userRouter from "./routes/user.mjs";
import { engine } from "express-handlebars";
import dashboardRouter, { loadDashboard } from "./routes/dashboard.mjs";
import VIEWS from "./views/view_catalog.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { randomUUID } from 'crypto'
import postRouter from "./routes/post.mjs";
import StorageManager from "./StorageManager.mjs";
import PostSchema from "./models/post.mjs";

//dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8080);

const middleWare = express.Router();
console.log(process.env.DATABASE_URL);

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

middleWare.use((req, res, next) => {
  let loggedInCookie = req.cookies.loggedInCookie;

    if(loggedInCookie === undefined) {
      res.cookie("loggedInCookie", false, { maxAge: 900000, httpOnly: true });
    } 
    // else {
    //   console.log("Cookie already exists", loggedInCookie);
    // }
    next();
})

// const oneDay = 24 * 60 * 60 * 1000;
// app.use(
//   session({
//     secret: "supersecretkey",
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 },
//     resave: false,
//   })
//   // (req, res, next) => {
//   //   console.log("Middleware: ", req.session.user);
//   //   if(req.session.user === undefined || req.session.user === null) {
//   //     req.session.user = null;
//   //   }
//   //   next();
//   // }
// );

app.get("/", middleWare, async (req, res, next) => {
  //let posts = await PostSchema.deleteMany({});
  loadDashboard(req, res, next);
});

app.use("/post", middleWare, postRouter);

app.use("/users", middleWare, userRouter);

app.use("/dashboard", middleWare, dashboardRouter);

app.listen(8080);
