import express from "express";
import { ExpressHandlebars } from "express-handlebars";
import StorageManager from "../StorageManager.mjs";
import VIEWS from "../views/view_catalog.mjs";
import PostSchema from "../models/post.mjs";

const dashboardRouter = express.Router();

dashboardRouter.get("/", async (req, res, next) => {
  res.render(VIEWS.dashboard.file);
});

export async function loadDashboard(req, res, next) {
  if (
    req.cookies.loggedInCookie === "false" ||
    req.cookies.loggedInCookie === "undefined" ||
    req.cookies.loggedInCookie === undefined
  ) {
    res.render(VIEWS.landing.file);
  } else if (req.cookies.loggedInCookie !== undefined) {
    const posts = await new StorageManager().retrievePosts();
    const chronologicalPosts = posts.reverse();
    chronologicalPosts.map(post => {
        if(post.user === req.cookies.loggedInCookie) {
            //console.log("User", post);
            post["isCurrentUser"] = true;
        }
        //console.log(post.toJSON());
    });

    //console.log("Dashboard", chronologicalPosts);

    const user = req.cookies.loggedInCookie;
    const userPosts = await new StorageManager().retrievePosts(user);
    
    res.render(VIEWS.dashboard.file, {
      user: user,
      posts: chronologicalPosts.map(post => post.toJSON()),
    });
  } else {
    res.render(VIEWS.landing.file);
  }
}

export default dashboardRouter;
