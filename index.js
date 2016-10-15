// Load Mongoose package

var mongoose = require('mongoose');

// connect to mongoDB and create/use database called todoAppTest

mongoose.connect('mongodb://localhost/todoAppTest');

// Create a schema
var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: {type: Date, default: Date.now}
});

// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);

// create a todo in memory
var todo = new Todo({name: "Master NODEJS", completed: false, note: "Getting there.."});

// save it to the database
todo.save(function (err) {
    if (err)
        console.log(err);
    else
        console.log(todo);
});

// Or, just create the entry more directly
Todo.create({name: "Create something with Mongoose", completed: true, note: "here's another one!"},
function(err, todo){
    if(err) console.log(err);
    else console.log(todo);
});

// to query, or find information
Todo.find(function (err, todos) {
    if(err) return console.error(err);
    console.log("Here's what I found: " + todos);
})

// callback function to avoid duplicating it all over
var callback = function(err, data) {
    if(err) {
        return console.error(err);
    }
    else{console.log(data);}
}

// Get only completed tasks
Todo.find({name: /JS$/}, callback);

var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);
// Get all tasks staring with `Master`, completed
Todo.find({name: /^Master/, completed: true }, callback);
// Get all tasks staring with `Master`, not completed and created from year ago to now...
Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);


// Model.update(conditions, update, [options], [callback])
// update `multi`ple tasks from complete false to true
Todo.update({ name: /master/i }, { completed: true }, { multi: true }, callback);
//Model.findOneAndUpdate([conditions], [update], [options], [callback])
Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);