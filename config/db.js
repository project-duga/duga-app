// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
require("dotenv/config")


// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URL = process.env.MONGODB_URL || "mongodb://duga-app:7Ml0pHyRjVWVoaJB@duga-cluster.y11u9.mongodb.net/dugaDB?authSource=admin&replicaSet=atlas-1353bp-shard-0&w=majority&readPreference=primary&appname=mongodb-vscode%200.6.14&retryWrites=true&ssl=true";


mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

 
