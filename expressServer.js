const express = require("express");

const app = express();
app.use(express.json());

let arrayOfTasks = [
    { id: "1", task: "buy grocery", isComplete: false },
    { id: "2", task: "learn kubernetes", isComplete: false }
];
let idCount=2;
app.route("/tasks")
    .get((req, res) => {
        res.send(arrayOfTasks);
    })
    .post((req, res) => {
        idCount+=1;
        const newTask={
            ...req.body,
            id: idCount,
            isComplete: false
        };
        arrayOfTasks.push(newTask);

        res.status(201).send(newTask);
    // add status as 201
    });

app.route("/task/:id")
    .put((req, res) => {
        const { id } = req.params;
        for (let i = 0; i < arrayOfTasks.length; i += 1) {
            if (arrayOfTasks[i].id === id) {
                arrayOfTasks[i].task = req.body.task;
                arrayOfTasks[i].isComplete = req.body.isComplete;
                res.send(req.body);
                //use js functions to implement
            }
        }
    })
    .patch((req, res) => {
        let id = req.params.id;
        for (let i = 0; i < arrayOfTasks.length; i += 1) {
            if (arrayOfTasks[i].id === id) {
                arrayOfTasks[i].isComplete = req.body.isComplete;
                res.send(arrayOfTasks[i]);
            }
        }
    })
    .delete((req, res) => {
        let id = req.params.id;
        for (let i = 0; i < arrayOfTasks.length; i += 1) {
            if (arrayOfTasks[i].id === id) {
                const deletedTask = arrayOfTasks.splice(i, 1);
                res.send(deletedTask);
            }
        }
    });
app.listen(8000, () => {
    console.log("express server running on ports 8000");
});