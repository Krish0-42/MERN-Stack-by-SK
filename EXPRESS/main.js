var express = require("express");
var app = express();
app.get("/myname",(req,res)=>{
    res.json({"msg":"yourname"});
});

app.post("/myname",(req,res)=>{
    res.json({"msg":"your post name"});
});

app.post("/login",(req,res)=>{

    let email = req['query']['email']
    let pwd = req['query']['password']
	let uname = req['query']['name']
	let adrs = req['query']['address']
    
	console.log(email, pwd)

	if(email == 'admin@gmail.com' && pwd == 'admin' && uname == 'kadmin' && adrs == '12, b st, c nagar, d 600 001'){
        res.json({"msg":"You are correct"})
    }else{
        res.json({"msg":"You are Incorrect"})
    }
});



app.listen(8080,()=>{
    console.log("Server Started")
});