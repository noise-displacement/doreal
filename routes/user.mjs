import express from "express";
//import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import UserSchema from "../models/user.mjs";
import VIEWS from "../views/view_catalog.mjs";

const { createHmac } = await import('node:crypto');

const userRouter = express.Router();

//get all users
userRouter.get("/", async (req, res, next) => {
  const users = await UserSchema.find();

  res.render(VIEWS.userList.file);
});

//get Login
userRouter.get("/login", (req, res, next) => {
  res.render(VIEWS.login.file);
});

userRouter.post("/login", async (req, res, next) => {
  const user = await UserSchema.find({ email: req.body.email });

  console.log(user);

  try {
    if (user == null || user == undefined) {
      return res.send("No user found");
    } else if (await bcrypt.compare(req.body.password, user[0].password)) {
      res.json(user);
    } else {
      res.send("Not allowed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

userRouter.get("/register", (req, res, next) => {
  res.render(VIEWS.register.file);
});

//post register
userRouter.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new UserSchema({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    // res.status(201).render(VIEWS.login.file, { accountCreated: true });
    res.json(newUser).end();
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

userRouter.get("/onRegisterComplete", (req, res, next) => {
  res.status(201).render(VIEWS.login.file, { accountCreated: true });
  next();
});

//get specific user
userRouter
  .route("/:id")
  .get(async (req, res, next) => {
    res.render(VIEWS.user.file, {
      username: await UserSchema.find({ id: req.params.id }).username,
    });
  })
  .patch(() => {})
  .delete(() => {});

export default userRouter;
