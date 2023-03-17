import express from "express";
import VIEWS from "../views/view_catalog.mjs";

const dashboardRouter = express.Router();

dashboardRouter.get("/", (req, res, next) => {
    res.render(VIEWS.dashboard.file);
});

export default dashboardRouter;