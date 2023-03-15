import express from "express";
import VIEWS from "../views/view_catalog.mjs";

const postRouter = express.Router();

postRouter.get("/", (req, res, next) => {
    res.render(VIEWS.dashboard.file);
});

postRouter.post("/upload", (req, res, next) => {
    const text = req.body.text;
    const user = req.cookies
})

export default postRouter;