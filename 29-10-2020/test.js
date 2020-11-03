const express = require('express');
const request = require('request');
const expressHandleBars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
function getLocations(CityName,callBack){
	request(`https://www.metaweather.com/api/location/search/?query=${CityName}`,{json:true},(err,res,body)=>{
			if(body.length===0)
			{
				callBack("Tên này không có em ơi ",undefined)
				return
			}
			callBack(null,body);
	})
}
function getWeather(woeid,callBack)
{
	request(`https://www.metaweather.com/api/location/${woeid}/`,{json:true},(err,res,body)=>{
		if(body.detail==='Not found.'){
			callBack("đừng nghịch url nha em",undefined,undefined)
		}
		else
		{
			callBack(null,body.consolidated_weather,body.title)
			console.log(body)
		}
	})
}
app.engine("handlebars",expressHandleBars())
app.set("view engine","handlebars");
app.get('/',(req,res,err)=>{
	const searchText = req.query.location;
	if(!searchText){
		res.render("home",{searchText})
		return
	}
	 getLocations(searchText, (error, locations) => {
    	res.render("home", { searchText, locations, error });
  	 });

})
app.get('/weather/:woeid',(req,res,err)=>{
	const woeid = req.params.woeid
	getWeather(woeid,(err,weathers,title)=>{
		res.render("weather",{err,weathers,title});
	})
})
app.listen(port,()=>{
	console.log("welcomes to BlackVine");
})