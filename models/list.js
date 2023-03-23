const mongoose = require("mongoose");
const TodoSchema = require('./todo').schema;


//make schema with title and checked 
const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'missing list name']
    },
    items: [TodoSchema]
}, { timestamps: true });


//create model
const List = mongoose.model("List", ListSchema);

module.exports = {
    model: List,
    schema: ListSchema
};