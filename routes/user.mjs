import express from "express";
import User from "../models/user.mjs";
//import bcrypt from "bcrypt";
import UserSchema from "../models/user.mjs";
import VIEWS from "../views/view_catalog.mjs";
import StorageManager from "../StorageManager.mjs";

const userRouter = express.Router();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, {expires: '1800s'});
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user

    next();
  })
}

//get all users
userRouter.get("/", async (req, res, next) => {
  const users = await UserSchema.find();

  res.render(VIEWS.userList.file);
});

//get Login
userRouter.get("/login", async (req, res, next) => {
  //console.log(await UserSchema.find({}));
  res.render(VIEWS.login.file);
});

userRouter.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await new StorageManager().retrieveUser(email, password);
  //console.log(user);
  //req.session.user = user;
  //console.log("Login route: ", req.session.user);

  //const token = generateAccessToken(user.username);
  //res.json(token);
  
  // Mega dum løsning, men proof of concept for å komme videre i utvikling. Fikk ikke sessions til å fungere. Kanskje JWT ville fungert bedre?
  res.cookie("loggedInCookie", user.username);
  next();
});

userRouter.get("/logout", (req, res, next) => {
  res.render(VIEWS.index.file);
})

userRouter.post("/logout", (req, res, next) => {
  console.log("logout");
  if(req.cookies.loggedInCookie) {
    res.clearCookie("loggedInCookie");
  }

  next();
})

userRouter.get("/register", (req, res, next) => {
  res.render(VIEWS.register.file);
});

//post register
userRouter.post("/register", async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  res.cookie('loggedInCookie', false);
  await new StorageManager().createUser(email, username, password);
  res.cookie("loggedInCookie", username);

  //const token = generateAccessToken(username);
  //res.json(token);

  res.json({ message: "User created" }).end();
});

userRouter.get("/onRegisterComplete", (req, res, next) => {
  res.render(VIEWS.dashboard.file);
});

export default userRouter;

