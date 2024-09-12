// create a sep dir(folder) for this 
// run npm i mongodb or npm install mongodb

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://saikrishnan209:Sairam_22@cluster0.bvxx4.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'sample_mflex';

async function main() {
  // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const data = await db.collection('movies').find({}).toArray();
    console.log(data);

  // the following code examples can be pasted here...
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());