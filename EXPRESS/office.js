const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');

const ex = express();
ex.use(express.json());

// Connection URL
const url = 'mongodb+srv://saikrishnan209:Sairam_22@cluster0.bvxx4.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'office';

async function insertData(req) {
  let { name, email, password, mobile } = req.body;
  
  let empData = {
    name,
    mobile,
    email,
    password
  };

  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('employee');
  await collection.insertOne(empData);
  console.log("Inserted");
  return 'done.';
}

// Handles GET requests [Retrieves data]
ex.get("/get_employee", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const list = await db.collection('employee').find({}).toArray();
  res.status(200).json(list);
});

// Handles GET requests to get an employee by name
ex.get("/list_emp_by_name/:name", async (req, res) => {
  await client.connect();
  const { name } = req.params;
  const db = client.db(dbName);
  const list = await db.collection('employee').find({ name }).toArray();
  res.json(list);  // Add missing response
});

// Handles POST requests [Submit's new data]
ex.post("/log-in-data", async (req, res) => {
  await client.connect();
  const { email, password } = req.body;
  const db = client.db(dbName);
  const list = await db.collection('employee').find({ email, password }).toArray();

  if (list.length > 0) {
    res.status(200).json({
      msg: "Login successful, correct details",
      data: list
    });
  } else {
    res.json({ msg: "Email or password is incorrect" });
  }
});

// Handles DELETE requests [Removes data]
ex.delete("/deleteUserByName", async (req, res) => {
  const { name } = req.query;
  const db = client.db(dbName);
  await client.connect();
  await db.collection("employee").deleteOne({ name });
  res.json({ msg: "User deleted" });
});

// Handles PUT requests [Update existing data]
ex.put("/update_password", async (req, res) => {
  const { name, password } = req.query;
  const db = client.db(dbName);  // Fixed typo dfName -> dbName
  await db.collection("employee").updateOne({ name }, { $set: { password } });
  res.json({ msg: "Password updated" });
});

// Get employee by ID
ex.put("/getById", async (req, res) => {
  const { id } = req.query;
  const db = client.db(dbName);
  const data = await db.collection("employee").findOne({ _id: new ObjectId(id) });
  res.json(data);
});

const PORT = 3000;
ex.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

