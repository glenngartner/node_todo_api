// create a todo in memory
var todo = new Todo({name: "Master NODEJS", completed: false, note: "Getting there.."});

// save it to the database
todo.save(function (err) {
    if (err)
        console.log(err);
    else
        console.log(todo);
})