var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var Page = require("./models/page");
var Comment = require("./models/comment")


var PORT = 3000;

var app = express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

app.get("/", function(req, res) {
    db.Page.find({saved: false})
        .then(function (dbPage) {
            console.log(dbPage);
            var hbsObject = {
                page: dbPage
            };
            res.render("index", hbsObject)
        })
        .catch(function (err) {
            res.json(err);
        });
    // res.render("index");
});

app.get("/saved", function(req, res) {
    db.Page.find({saved: true})
        .then(function (dbPage) {
            console.log(dbPage);
            var hbsObject = {
                page: dbPage
            };
            res.render("saved", hbsObject)
        })
        .catch(function (err) {
            res.json(err);
        });
    // res.render("index");
});

//look at unit 18, activity 12 for the table to be deleted

// in server.js create a route that will delete everything in page collection
// in app.js make an on-click function with an ajax call to the clear route that you made in server.js
// on the front end, make a button to correspond to the on-click
//then add button for clear-all function

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
            // result.author = $(this)
            //     .children(".c-entry-box--compact__body")
            //     .children(".c-entry-box--compact__title")
            //     .children("c-byline")

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
        .populate("note")
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
            return db.Page.findOneAndUpdate({ _id: req.params.id }, { page: dbPage._id }, { new: true });
        })
        .then(function (dbPage) {
            res.json(dbPage);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.put("/pages/:id", function(req, res) {
    db.Page.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}})
    .then(function(dbPage) {
        res.json(dbPage);
    });
});


app.listen(PORT, function () {
    console.log("App running port " + PORT + "!");
});