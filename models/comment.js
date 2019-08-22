var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    title: String,
    body: String,
});

var Page = mongoose.model("Comment", PageSchema);

module.exports = Page;