import express from "express";
import VIEWS from "../views/view_catalog.mjs";
import StorageManager from "../StorageManager.mjs";

const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
    const posts = await new StorageManager().retrievePosts({});
    res.json(posts);
});

postRouter.post("/upload", async (req, res, next) => {
    console.log(req.body.postText);
    const posts = await new StorageManager().retrievePosts({});
    const postsLength = posts.length;

    const id = postsLength + 1;
    const text = req.body.postText;
    const user = req.cookies.loggedInCookie;

    await new StorageManager().createPost(user, text, id);
})

postRouter.post("/delete", async (req, res, next) => {
    const id = req.body.context;
    //console.log("Delete route", id);
    await new StorageManager().deletePost(id);
});

export default postRouter;