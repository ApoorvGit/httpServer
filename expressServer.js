const express=require("express");
const bodyParser = require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let arrayOfTasks=[
    { id: "1", task: "buy grocery", isComplete: false},
    { id: "2", task: "learn kubernetes", isComplete: false}
];
app.route("/tasks")
    .get((req, res)=>{
        res.send(arrayOfTasks);
    })
    .post((req, res)=>{
        arrayOfTasks.push(req.body);
        res.send(req.body);
    });

app.route("/task/:id")
    .put((req, res)=>{
        let id=req.params.id;
        for(let i=0;i<arrayOfTasks.length;i+=1){
            if(arrayOfTasks[i].id==id){
                arrayOfTasks[i].task=req.body.task;
                arrayOfTasks[i].isComplete=req.body.isComplete;
                res.send(req.body);
            }
        }
    })
    .patch((req, res)=>{
        let id=req.params.id;
        for(let i=0;i<arrayOfTasks.length;i+=1){
            if(arrayOfTasks[i].id==id){
                arrayOfTasks[i].isComplete=req.body.isComplete;
                res.send(arrayOfTasks[i]);
            }
        }
    })
    .delete((req, res)=>{
        let id=req.params.id;
        for(let i=0;i<arrayOfTasks.length;i+=1){
            if(arrayOfTasks[i].id==id){
                let x=arrayOfTasks.splice(i, 1);
                res.send(x);
            }
        }
    });
app.listen(8000, ()=>{
    console.log("express server running on ports 8000");
});