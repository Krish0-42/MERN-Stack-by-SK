// "npm init -y" o create a package.json file. 
// "npm install body-parser" body-parser for parsing JSON requests).
// "npm install express mongodb" run this to install both
// "npm i cors" run this, is cross-origin resource sharing in Express
const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB name
const Mdb = 'Hire';
// url for the Database
const url = 'mongodb+srv://saikrishnan209:Sairam_22@cluster0.bvxx4.mongodb.net/';
const client = new MongoClient(url);

const run = async () => {
    try {

        app.post("/new_job", async (req, res) => {
            console.log("Enter the information - name, company, email and password:");
            let { name, company, email, password } = req.body;
            let info = {
                "name": name,
                "company": company,
                "email": email,
                "password": password
            }
            console.log(info);
            //console.log("Your information has been Inserted!");
            /* `res.send("Your information has been Inserted!");` is sending a response back to the client, it will be on the client side */
            res.send("Your information has been Inserted!");
            
            try {
                await client.connect();
                let db = client.db(Mdb);
                await db.collection('Job').insertOne(info);
                res.status(200).json({ "message": "Added the Job Successfully!!!" });
            } catch (err) {
                console.error(err);
                res.status(500).json({ "error": "Internal server error" });
            } finally {
                await client.close();
            }

        });

        app.put("/update_job", async (req, res) => {
            console.log("Updating...");
            let { id, name, company, email, password } = req.body;
            console.log(req.body);

            try {
                await client.connect();
                let db = client.db(Mdb);
                let result = await db.collection('Job').updateOne(
                    { "_id": new ObjectId(id) }, // converting the id to string.
                    {
                        $set:
                        {
                            "name": name,
                            "company": company,
                            "email": email,
                            "password": password
                        }
                    })

                console.log("Updated Successfully!!!")

                if (result.modifiedCount === 1) {
                    res.json({ "message": "Updated the Job Successfully!!!" });
                } else {
                    res.status(404).json({ "error": "Document not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ "error": "Internal server error" });
            }
        });

        app.delete("/delete_it", async (req, res) => {
            let { id } = req.body;
            console.log("Deleting document with _id:", id);
            try {
                await client.connect();
                let db = client.db(Mdb);
                let result = await db.collection('Job').deleteOne({ "_id": new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.json({ "message": "Deleted the Id!" });
                } else {
                    res.status(404).json({ "error": "Document not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ "error": "Internal server error" });
            }
        });

        app.get("/fetch_detail", async (req, res) => {
            console.log("Fetching...");
            let { name } = req.query;
            try {
                await client.connect();
                let db = client.db(Mdb);
                let result = await db.collection('Job').find({ "name": name }).toArray();
                console.log("Details of the candidate: ", result);
                res.status(200).json(result);
                console.log("Your results as requested.");
            } catch (err) {
                console.log(err);
                res.status(500).json({ "error": "Internal server error" });
            }
        });
    } catch (err) {
        console.error("MongoDB connection error!!!", (err));
        // Close the db if error occurs
        await client.close();
        // Do it immediately
        process.exit();
    }
};

// `process.env.PORT` is used to get the value of the PORT environment variable. If faulty, it will use default listen(er) 3000.
const PORT = process.env.PORT || 3000;
// Start the server
// When you call a function that returns a Promise, you can use .then() to specify what should happen once that Promise is resolved.
run().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(console.error);

// Look for the comment
/*
// req.params, properties mapped to the named route "parameters"
// req.query, key-value pairs that appear in the URL after a question mark (?). They are often used for filtering or pagination.
// req.body, contains data sent by the client in the body of the request, typically in JSON format. Useful for complex insertion or update.
*/

/*
Commonly Used Ports
3000: Often used by Node.js applications.
8000: Commonly used for development servers.
8080: Frequently used for web applications as an alternative to port 80.
5000: Used by Flask applications and other web frameworks.
4200: Default port for Angular applications.
6379: Default port for Redis.
5432: Default port for PostgreSQL.
27017: Default port for MongoDB.
5001: Often used for various services, including APIs.
8888: Commonly used for Jupyter Notebook servers.
*/

/*
• 200 OK; • 404 Not Found ; • 500 Internal Server Error ;
• 301 Moved Permanently; • 302 Found ; • 401 Unauthorized ;
• 403 Forbidden ; • 429 Too Many Requests ; 
• 503 Service Unavailable ; • 304 Not Modified
*/