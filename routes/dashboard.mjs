import express from "express";
import VIEWS from "../views/view_catalog.mjs";

const dashboardRouter = express.Router();

let posts = [
    {
        id: 1,
        name: "Post 1",
        description: "Post description 1",
    },

    {
        id: 2,
        name: "Post 2",
        description: "Post description 2",
    },

    {
        id: 3,
        name: "Post 3",
        description: "Post description 3",
    },
]

dashboardRouter.get("/", (req, res, next) => {
    res.render(VIEWS.dashboard.file, {posts});
});

export default dashboardRouter;