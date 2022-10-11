const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());



app.post("/",(req,res) => {
        const file = fs.readFileSync("./todo.json",{encoding:"utf-8"});
        console.log(file)
         const parsedFile = JSON.parse(file);
         parsedFile.todo.push(req.body);
         console.log(parsedFile)
         fs.writeFileSync("./todo.json", JSON.stringify(parsedFile),{encoding:"utf-8"});
         res.send("todo list added");
});

app.get("/",(req,res) => {
        const data = fs.readFileSync("./todo.json",{encoding:"utf-8"})
        const parseddata = JSON.parse(data)
        const todo = parseddata.todo;
        console.log(todo);
        res.send(todo)
});

app.put("/",(req,res) => {
    const id = req.params.id;
        const todo = req.body;
        const prev_data = fs.readFileSync("./products.json",{encoding:"utf-8"})
        const parsed_prev_data = JSON.parse(prev_data);
        const old_todos = parsed_prev_data.todos;
        const new_todos = old_todos.map((prod) => {
            if(prod.id === todo.id)
            {
                return todo;
            }
            else{
                return prod;
            }
        })

        parsed_prev_data.todos = new_todos;
        const latest_todos = JSON.stringify(parsed_prev_data);

        fs.writeFileSync("./products.json",latest_todos,"utf-8");
        console.log(todo)
        res.send("todo modified");
});

app.delete("/:id",(req,res) => {
    const id = req.params.id;
    const prev_data = fs.readFileSync("./todo.json",{encoding:"utf-8"})
    const parsed_prev_data = JSON.parse(prev_data)
    const old_todos = parsed_prev_data.todos;
    const new_todos = old_todos.filter((prod) => prod.id !== id)
    parsed_prev_data.todos = new_todos;
    const latest_todos = JSON.stringify(parsed_prev_data)
    
    fs.writeFileSync("./todos.json",latest_todos, "utf-8")
    console.log(latest_todos)
    res.send("product deleted");
});

app.listen(8080,() => {
    console.log("Listening to port 8080");
});