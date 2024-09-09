const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://saikrishnan209:Sairam_22@cluster0.bvxx4.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'office';

async function insertData() {

    let empData = {
        "name": "Krishna",
        "mobile" : "9150867165",
        "address" : "12, ABC St, DEF nagar, ghi 100 0001"
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
app.delete("/deleteUserByName", async(req, res) => {
  let {name} = req.query;
  await client.connect();
  await db.collection("employee").deleteOne({"name" : name});
  res.json({"msg" : "user deleted"});
})

insertData()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    