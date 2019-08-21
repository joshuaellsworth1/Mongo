var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("http://www.theverge.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".c-entry-box--compact").each(function (i, element) {
            var result = {};

            result.headline = $(this)
                .children(".c-entry-box--compact__body")
                .children(".c-entry-box--compact__title")
                .children("a")
                .text();
            result.url = $(this)
                .children(".c-entry-box--compact__body")
                .children(".c-entry-box--compact__title")
                .children("a")
                .attr("href");
            result.author = $(this)
                .children(".c-entry-box--compact__body")
                .children(".c-entry-box--compact__title")
                .children("c-byline")

                console.log(result);

            db.Page.create(result)
                .then(function (dbPage) {
                    console.log(dbPage);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("scrape complete");
    });
});

app.get("/pages", function (req, res) {
    db.Page.find({})
        .then(function (dbPage) {
            res.json(dbPage);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/pages/:id", function (req, res) {
    db.Page.findOne({ _id: req.params.id })
        .populate("summary")
        .then(function (dbPage) {
            res.json(dbPage);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/pages/:id", function (req, res) {
    db.Page.create(req.body)
        .then(function (dbPage) {
            return db.Page.findOnAndUpdate({ _id: req.params.id }, { page: dbPage._id }, { new: true });
        })
        .then(function (dbPage) {
            res.json(dbPage);
        })
        .catch(function (err) {
            res.json(err);
        });
});


app.listen(PORT, function () {
    console.log("App running port " + PORT + "!");
});