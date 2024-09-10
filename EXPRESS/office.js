const { MongoClient } = require('mongodb');
const express = require('express');
// or as an es module:
// import { MongoClient } from 'mongodb'

const ex = express();
app.use(express.json());

// Connection URL
const url = 'mongodb+srv://saikrishnan209:Sairam_22@cluster0.bvxx4.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'office';

async function insertData() {
  let { name, email, password, mobile } = req.body;
  let empData = {
    "name": name,
    "mobile": mobile,
    "email": email,
    "password": password
  }

  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = await db.collection('employee');
  await collection.insertOne(empData);
  console.log("Inserted");

  // the following code examples can be pasted here...
  return 'done.';
}

// Handles GET requests, typically used to retrieve data from the server. [Retrieves data]
app.get("/get_employee", async (req, res) => {
  await client.connect();
  let db = client.db(dbName);
  let list = await db.collection('employee').find({}).toArray();
  res.status(200).json(list)
})

app.get("/list_emp_by_name/:name", async (req, res) => {
  await client.connect();
  let { name } = req.params; //capture values specified at their position in the URL.
  let db = client.db(ex);
  let list = await db.collection('employee').find({ name: name }).toArray();
})

// [Submit's new data] Handles POST requests, mainly used to submit or insert new data to the server.
app.post("/log-in-data", async (req, res) => {
  await client.connect();
  let { email, password } = req.body;
  let db = client.db(ex);
  let list = await db.collection('employee').find({ "email": email, "password": password }).toArray();

  if (list.length > 0) {
    res.status(200).json({
      "msg": "Login successful, correct details",
      "data": list
    });
  } else {
    res.json({ "msg": "Email or password is incorrect" })
  }
})

// [Removes data] Handles DELETE requests, used to delete data from the server.
app.delete("/deleteUserByName", async (req, res) => {
  let { name } = req.query;
  await client.connect();
  await db.collection("employee").deleteOne({ "name": name });
  res.json({ "msg": "user deleted" });
})

// [Update existing data] Handles PUT requests, used to update existing data on the server.
app.put("/update_password", async (req, res) => {
  let(name, password) = req.query;
  let db = client.db(dfName);
  await db.collection("employee").updateOne({ "name": name }, { $set: { "password": password } });
  res.json({ "msg": "password updated" });
});

app.put("/getById", async (req, res) => {
  let { id } = req.query;
  let db = client.db(dbName);
  let data = await db.collection("employee ").find({ "_id": new ObjectId(id) });
  res.json(data)

})

insertData()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
