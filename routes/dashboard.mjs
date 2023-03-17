import express from "express";
import { ExpressHandlebars } from "express-handlebars";
import StorageManager from "../StorageManager.mjs";
import VIEWS from "../views/view_catalog.mjs";

const dashboardRouter = express.Router();

dashboardRouter.get("/", (req, res, next) => {
  res.render(VIEWS.dashboard.file);
});

export async function loadDashboard(req, res, next) {
  if (
    req.cookies.loggedInCookie === "false" ||
    req.cookies.loggedInCookie === undefined
  ) {
    res.render(VIEWS.landing.file);
  } else if (req.cookies.loggedInCookie !== undefined) {
    const posts = await new StorageManager().retrievePosts();
    const chronologicalPosts = posts.reverse();
    
    res.render(VIEWS.dashboard.file, {
      user: req.cookies.loggedInCookie,
      posts: chronologicalPosts.map(post => post.toJSON()),
    });
  } else {
    res.render(VIEWS.landing.file);
  }
}

export default dashboardRouter;
