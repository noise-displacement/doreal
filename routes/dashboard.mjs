import express from "express";
import StorageManager from "../StorageManager.mjs";
import VIEWS from "../views/view_catalog.mjs";

const dashboardRouter = express.Router();

dashboardRouter.get("/", async (req, res, next) => {
  res.render(VIEWS.dashboard.file);
});

export async function loadDashboard(req, res, next) {
  //console.log("Users", await UserSchema.find({}));
  //console.log("Dashboard", await PostSchema.find({}));

  // Looking for an undefined user here is probably bad if the users username is actually "undefined". But the cookie naming sucks anyway so this won't be a problem in prod.
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
            post["isCurrentUser"] = "true";
        }
        //console.log(post.toJSON());
    });

    //console.log("Dashboard", chronologicalPosts);

    const user = req.cookies.loggedInCookie;
    const userPosts = await new StorageManager().retrievePosts(user);
    console.log(chronologicalPosts);
    
    res.render(VIEWS.dashboard.file, {
      user: user,
      posts: chronologicalPosts.map(post => post.toJSON()),
    });
  } else {
    res.render(VIEWS.landing.file);
  }
}

export default dashboardRouter;
