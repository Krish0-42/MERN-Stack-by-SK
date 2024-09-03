var express = require("express");
var app = express();

app.get("/myname",(req,res)=>{
res.json({"msg":"yourname"});
});

app.post("/myname",(req,res)=>{
	res.json({"msg":"post name"});
	});

app.post("/login",(req,res)=>{
	let email = req['query']['email']
res.json({"msg":"email"});
});

app.listen(8080,()=>{
	console.log("server started")
})