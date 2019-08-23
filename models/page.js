var mongoose = require("mongoose");
var Page = require("./page")
var Schema = mongoose.Schema;
var PageSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        href: "Comment"
    }
});

var Page = mongoose.model("Page", PageSchema);

module.exports = Page;