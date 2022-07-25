const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:8081/esgdb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});