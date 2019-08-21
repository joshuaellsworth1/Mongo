var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/27017", {useNewURLParser: true});

app.get("/scrape", function(req, res) {
    axios.get("http://www.theverge.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("").each(function(i, element) {
            var result = {};

            result.healine = $(this).children("a").text();
            result.summary = $(this).children("a").text();
            result.url = $(this).children("a").attr("href");

            db.Page.create(result)
            .then(function(dbPage) {
                console.log(dbPage);
            })
            .catch(function(err) {
                console.log(err);
            });
        });
        res.send("scrape complete");
    });
});