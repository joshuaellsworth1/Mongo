var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    headline: String,
    url: String,
    author: String
});

var Page = mongoose.model("Comment", PageSchema);

module.exports = Page;