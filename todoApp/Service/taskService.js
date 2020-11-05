const ModelDB = require('../Model/ModelDB.js')

const taskModel = ModelDB.createModel('task')

const getAlltask = ()=>{
	return taskModel.getAllEntity()
}

const getTaskByID = (taskID)=>{
	return taskModel.getEnttityByID(taskID)
}

const addTask = (task)=>{
	taskModel.addEntity(task)
}

module.exports = {getAlltask,getTaskByID,addTask}
