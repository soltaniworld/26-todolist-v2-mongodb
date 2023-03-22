const mongoose = require("mongoose");

//make schema with title and checked 
const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'missing todo item value']
    },
    completed: {
        type: Boolean,
        required: [true, 'missing completion status']
    },
    list: {
        type: String,
        required: [true, 'no list specified']
    }
}, { timestamps: true });


//create model
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;