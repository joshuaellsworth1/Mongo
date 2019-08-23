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
    // author: {
    //     type: String,
    //     required: true
    // },
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var Page = mongoose.model("Page", PageSchema);

module.exports = Page;