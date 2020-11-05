const express = require('express')
const {addTask,getAlltask,getTaskByID} = require("./Service/taskService.js")
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.post("/tasks",(req,res)=>{
	const object = req.body
	res.send(object);
	addTask(object)
})

app.get("/tasks",(req,res)=>{
	const tasks = getAlltask();
	res.send(tasks);
})
app.listen(port,()=>{
	console.log("welcome to my server !!")
})