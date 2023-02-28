import express from "express";
import jokeRoute from "./routes/joke.mjs";
import router from "./routes/random.mjs";
import translateDocument from "./routes/translation.mjs";

function initServer() {
  const server = express();
  const port = process.env.PORT || 8080;

  server.set("port", port);
  server.use(express.static("public"));
/* 
  server.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  }); */

  server.use("/api/random", router);
  server.use("/translate", translateDocument);
  server.use("/joke", jokeRoute);

  server.listen(server.get("port"), function () {
    console.log("server running", server.get("port"));
  });
}

initServer();