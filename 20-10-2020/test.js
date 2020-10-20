const express = require('express');
const app = express();
const port = 3000;

const navItems = [
		{
			path:"/HomePape",
			title:"Home",
		},
		{
			path:"/Explore",
			title:"explore",
		},
		{
			path:"/Message",
			title:"Message",
		}
];
const messages = [
    {
      path: "/Message/cdd03992-6d49-51f6-a621-ca3204e62944",
      title: "message 1",
    },
    {
      path: "/Message/5f3d5e98-4f44-5150-99a6-8a18a7e12eb8",
      title: "message 2",
    },
  ];
function renderNavBar(path,navItems){
	var navBar = '<ul>' 
	navItems.forEach((navItem)=>{
		if(path===navItem.path){
			navBar+=`<li><i>${navItem.title}</i></li>`
		}
		else
			navBar+=`<li><a href=${navItem.path}>${navItem.title}</a></li>`
	})
	navBar+='</ul>'
	return  navBar;
}
function renderContent(path,content,_navItems = navItems){
	const navBar = renderNavBar(path,_navItems);
	var content = `<h3 style="color:cyan">${content}</h1>`
	return `${navBar}${content}`;
}
app.post('/',(req,res)=>{
	res.send(renderContent("/HomePape","HomePape"));
})
app.get("/HomePape",(req,res)=>{
	res.send(renderContent("/HomePape","Home Pape"));
})	
app.get("/Explore",(req,res)=>{
	res.send(renderContent("/Explore","Explore"));
})
app.get("/Message",(req,res)=>{
	const contentPape = renderContent("/Message","Message");
	const contentMessage = renderNavBar(req.path, messages);
	res.send(`${contentPape}${contentMessage}`);
})	
app.get("/Message/:messageID",(req,res)=>{
	const contentPape = renderContent("/Message","Message");
	const contentMessage = renderContent(req.path, req.params.messageID, messages);
	res.send(`${contentPape}${contentMessage}`)
})
app.listen(port,()=>{
	console.log(`example app listening at htpp://localhost:${port}`);
});