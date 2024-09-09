var express = require("express");
var app = express();

app.use(express.json()); // use this where your going to use .body()

app.get("/my_name",(req,res)=>{
    res.json({"msg":"your_name"});
});

app.post("/my_name",(req,res)=>{
    res.json({"msg":"your post name"});
});

app.post("/login",(req,res)=>{

    let email = req['query']['email']
    let pwd = req['query']['password']
	let uname = req['query']['name']
	let adrs = req['query']['address']

	//let { email2, password, name, address } = req.body;
    

	console.log(email, pwd)

	if(email == 'admin@gmail.com' && pwd == 'admin' && uname == 'k_admin' && adrs == '12, b st, c nagar, d 600 001'){
        res.json({"msg":"You are correct"});
    }else{
        res.json({"msg":"You are Incorrect"});
    }
});

// Method 2
app.post("/login2",(req,res)=>{

	let { email, password, name, address } = req.query;

	if(email == 'admin@gmail.com' && password == 'admin' && name == 'k_admin' && address == '12, b st, c nagar, d 600 001'){
        res.json({"msg":"You are correct"});
    }else{
        res.json({"msg":"You are Incorrect"});
    }
});

app.delete("/deleteUserByName", async(req, res) => {
    let {name} = req.query;
    await client.connect();
    await db.collection("employee").deleteOne({"name" : name});
    res.json({"msg" : "user deleted"});
})

app.listen(8080,()=>{
    console.log("Server Started")
});