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

  const post = await new StorageManager().retrievePosts({ id });
  if (post[0].user === req.cookies.loggedInCookie) {
    await new StorageManager().deletePost(id);
  }
});

postRouter.put("/edit", async (req, res, next) => {
  const id = req.body.context;
  const text = req.body.postText;
  //console.log("Edit route", id, text);

  try {
    const post = await new StorageManager().retrievePosts({ id });
    if (post[0].user === req.cookies.loggedInCookie) {
      await new StorageManager().editPost(id, text);
    }
  } catch (err) {
    console.log(err);
  }
});

export default postRouter;
