const express = require('express');
const request = require('request');
const expressHandleBars = require('express-handlebars');
const app = express();
const port = 3000;
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
		try{
			 callBack(null,body.consolidated_weather)
		}
		catch(err)
		{
			callBack(err,undefined)
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
	const cityName = req.query.cityName
	getWeather(woeid,(err,weathers)=>{
		res.render("weather",{err,weathers,cityName});
	})
})
app.listen(port,()=>{
	console.log("welcomes to BlackVine");
})