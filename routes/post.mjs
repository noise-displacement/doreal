import express from "express";
import VIEWS from "../views/view_catalog.mjs";
import StorageManager from "../StorageManager.mjs";

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  const posts = await new StorageManager().retrievePosts({});
  res.json(posts);
});

postRouter.post("/create", async (req, res, next) => {
  //console.log(req.body.postText);
  const posts = await new StorageManager().retrievePosts();
  const postsLength = posts.length;

  const id = postsLength + 1;
  const text = req.body.postText;
  const user = req.cookies.loggedInCookie;

  if(req.cookies.loggedInCookie !== "false" && req.cookies.loggedInCookie !== undefined) {
    await new StorageManager().createPost(user, text, id);
  }
});

postRouter.delete("/delete", async (req, res, next) => {
  const id = req.body.context;
  console.log("Delete route", id);

  const post = await new StorageManager().retrievePosts(undefined, id);
  console.log(post);

  try {
    if (post[0]?.user === req.cookies.loggedInCookie) {
      await new StorageManager().deletePost(id);
      res.json({ message: "Post deleted" }).end();
    } else {
      res.send(403).end();
    }
  } catch(err) {
    console.log(err);
    res.json({ message: "Post not deleted", err: err }).end();
  }
});

postRouter.put("/edit", async (req, res, next) => {
  const id = req.body.context;
  const text = req.body.postText;
  console.log("Edit route", id, text);

  try {
    const post = await new StorageManager().retrievePosts(undefined, id);

    if(text.length === 0) {
      res.sendStatus(400).end();
    } else if (post[0].user === req.cookies.loggedInCookie) {
      await new StorageManager().editPost(id, text);
      res.json({ message: "Post edited" }).end();
    } else {
      res.sendStatus(403).end();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500).end();
  }
});

export default postRouter;
