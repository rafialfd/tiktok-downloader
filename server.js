const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

const API = process.env.API;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/get-video", (req, res) => {
  const videoURL = encodeURIComponent(req.body.url);
  const host = "https://tiktok-scraper7.p.rapidapi.com/?url=";
  const url = host + videoURL;

  fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "79fea81cd0msh36d226ee2009aa6p1e3ff7jsn439118faeb23",
      "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com",
    },
  })
    .then((result) => result.json())
    .then((data) => res.json(data));
});

app.listen(3000);
