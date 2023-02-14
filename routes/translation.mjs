import express from "express";
import Dictionary from "../public/modules/Dictionary.mjs";

const translateDocument = new express.Router();

const SUPPORTED_LANGUAGES = {
  EN_UK: "en-uk.json",
  "NO-NB": "no-nb.json",
};

const dictionary = new Dictionary();

translateDocument.get("/:language", async (req, res, next) => {
console.log(req.params.language);
  await dictionary.setLanguage(req.params.language);

  res.status(200).send(dictionary.getWord("end")).end();
});

export default translateDocument;
