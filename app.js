//jshint esversion:6

const express = require("express");
const date = require(__dirname + "/date.js");
const connectDB = require('./config/db');
const Todo = require('./models/todo');
const _ = require('lodash');

connectDB();
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // reads JSON requests
app.use(express.static("public"));




// =================================== ROUTES ===================================

//GET route - redirect / to /home
app.get('/', (req, res) => {
  res.redirect('/Today');
});


// POST route - adds new task from input into DB
app.post("/updateTask", function (req, res) {
  const task = req.body.task;
  const id = req.body.id;
  const completed = req.body.completed;
  Todo.findByIdAndUpdate(id, {
    task: task,
    completed: completed
  })
    .then(() => {
      res.status(200).send("updated");
    });
  console.log(req.body.id);
  // res.status(200).send("updated");
  // console.log(req.body.id);
});


// POST route - adds new task from input into DB
app.post("/add/:list", function (req, res) {
  const task = req.body.newItem;
  const listName = req.params.list.trim();
  if (listName != "") {
    pushToList(task, listName);
    res.redirect(`/${listName}`);
  }
  else{
    res.redirect('/');
  }
});

//about GET route
app.get("/about", function (req, res) {
  res.render("about");
});

// POST route - DELETE item from DB
app.post('/deleteTask', (req, res) => {
  Todo.findByIdAndDelete(req.body.id)
    .then(() => {
      res.send("recieved");
    });
});

//GET route - Loads list
app.get("/:list", (req, res) => {
  const listName = _.capitalize(req.params.list.trim().toLowerCase());
  let lists = [];
  getDistinctLists()
    .then((lists) => {
      Todo.find({ list: listName })
        .then((items) => {
          res.render("list", {
            listTitle: listName,
            items: items,
            lists: lists
          });
        });
    });
});

// GET route - all other URLs
app.get('*', (req, res) => {
  res.status(404).send('Error 404, page not found');
})

// =================================== SERVER LISTENER ===================================
app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// =================================== callback functions ===================================

//find and return list of tasks under listname
async function getList(listName) {
  try {
    const todos = await Todo.find({ list: listName }).exec();
    return todos;
  } catch (err) {
    return null;
  }
}

//save new task to list
function pushToList(task, list) {
  const todo = new Todo({
    task: task,
    completed: false,
    list: list
  });
  todo.save();
}


//find show distinct
async function getDistinctLists() {
  const lists = await Todo.find().distinct('list').exec();
  return lists;
}

