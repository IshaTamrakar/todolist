//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/* const date = require(__dirname + "/date.js"); */

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

/* const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
 */

//getting mongoose schema
const itemsSchema = {
  name: String,
};

//mongoose model
const Item = mongoose.model("Item", itemsSchema);

/*
 difference between mongoose schema and mongoose model
a mongoose schema defines the structure of the document, default values, validators etc.
whereas
a mongoose model provides an interface to the database for crreating, querying, updating, deleting records, etc.

*/

const item1 = new Item({
  name: "sleep",
});
const item2 = new Item({
  name: "eat",
});
const item3 = new Item({
  name: "repeat",
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function (err) {
  if (err) {
    console.log(err);
  } else {
    ("database has been successfully created");
  }
});



app.get("/", function (req, res) {
  /*  const day = date.getDate(); */

  item.find({},function(err, foundItems){
    res.render("list", { listTitle: "Today", newListItems:foundItems });
  });

  
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
