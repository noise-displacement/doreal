import express from "express";
import joke from "jokemaster/joke.mjs";

const jokeArray = [
    "Why is gravity everywhere? Because it is mass-produced", 
    "How many programmers does it take to change a light bulb? None - It's a hardware problem", 
    "Why is gravity everywhere? Because it is mass-produced",
];

const noJokesFalback = "Sorry, I am all out of laughs";

const jokeTeller = new joke(jokeArray);

const jokeRoute = new express.Router();

jokeRoute.get("/", (req, res, next) => {
    res.status(200).send(jokeTeller.tellAJoke()).end();
});

export default jokeRoute;