const fs = require('fs')
const path = require('path')
const DB_DIR = path.resolve(__dirname,"../db")
const createModel = (modelName)=>{
	const getCurrentDay = ()=>{
		let currentDay = new Date()
		const dd = String(currentDay.getDate()).padStart(0,2)
		const mm = String(currentDay.getMonth()+1).padStart(0,2)
		const yy = currentDay.getFullYear()
		currentDay = `${dd}\\${mm}\\${yy}`
		return currentDay
	}
	const DB_FILE = path.resolve(DB_DIR,`${modelName}.json`)
	
	const ensureDBFILE= ()=>{
		if(!fs.existsSync(DB_DIR))
			fs.mkdir(DB_DIR,(err)=>{
				console.log(err)
			})
		if(!fs.existsSync(DB_FILE))
			fs.writeFileSync(DB_FILE,"",(err)=>{
				console.log(err)
			})
	}

	const getAllEntity= ()=>{
		try{
			const entities = fs.readFileSync(DB_FILE,{encoding:"utf-8"})
		 	return JSON.parse(entities)
		}
		catch(err){
			return []
		}

	}
	const getEntityByID = (ID)=>{
			const entities = getAllEntity()
			return entities.find((enID)=>enID===ID)
	}
	const SaveEntitiestoDB = (entities)=>{
		fs.writeFileSync(DB_FILE,JSON.stringify(entities),(err)=>{
			console.log(err)
		})
	}

	const addEntity=(entityInput)=>{
		ensureDBFILE()
		const entity= {
			...entityInput,
			ID : Date.now().toString(),
			CreatedDate : getCurrentDay()
		}
		const entities = getAllEntity()
		entities.push(entity)
		SaveEntitiestoDB(entities)
		return entities
	}
	return {getAllEntity,getEntityByID,addEntity}
}
module.exports = {createModel}