var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true
    }
});

var Page = mongoose.model("Comment", PageSchema);

module.exports = Page;