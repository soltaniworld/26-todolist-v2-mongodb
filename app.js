//jshint esversion:6

const express = require("express");
const date = require(__dirname + "/date.js");
const mongoose 	= require("mongoose");
const db = require('./models/connect');
const Todo = require('./models/todo');

db.connect(mongoose);

const task = new Todo({
  task: 'testing another one',
  completed: true,
  list: 'home'
});
// task.save();

// getList('home');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


// =================================== ROUTES ===================================

//home GET route
app.get("/", function(req, res) {
  const day = date.getDate();
  //return list of items under list 'home'
  Todo.find({list: 'home'})
  .then((items)=>{
    res.render("list", {listTitle: day, items: items});
  });
});


//home POST route
app.post("/", function(req, res){
  const item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "work") {
    pushToList(item, 'work');
    res.redirect("/work");
  } else {
    pushToList(item, 'home');
    res.redirect("/");
  }
});

//work GET route
app.get("/work", function(req,res){
  //return list of items under list 'work'
  Todo.find({ list: 'work' })
    .then((items) => {
      res.render("list", { listTitle: "Work List", items: items });
    })
});

//about GET route
app.get("/about", function(req, res){
  res.render("about");
});

//udpate post route
app.post('/update', (req, res)=>{
  const body = req.body;
  console.log(body);
  res.send("recieved");
})

// =================================== SERVER LISTENER ===================================
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// =================================== callback functions ===================================

//find and return list of tasks under listname
async function getList(list) {
  Todo.find({ list: list })
    .then((lists) => {
      console.log(lists);
      return lists
    })
}

//save new task to list
function pushToList(task, list){
  const todo = new Todo({
    task: task,
    completed: false,
    list: list
  });
  todo.save();
}