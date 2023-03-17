import express from "express";
import VIEWS from "../views/view_catalog.mjs";
import StorageManager from "../StorageManager.mjs";

const postRouter = express.Router();

postRouter.get("/", (req, res, next) => {
    res.render(VIEWS.dashboard.file);
});

postRouter.post("/upload", async (req, res, next) => {
    console.log(req.body.postText);
    const text = req.body.postText;
    const user = req.cookies.loggedInCookie;

    await new StorageManager().createPost(user, text);
})

export default postRouter;