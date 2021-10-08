const mongoose = require("mongoose")

const user = process.env.MONGODB_ATLAS_USER
const pass = process.env.MONGODB_ATLAS_PASS
const host = process.env.MONGODB_ATLAS_HOST
const dbName = process.env.MONGODB_ATLAS_DBNAME
const a =
  "mongodb+srv://user:pass@cluster0.wsexn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri ="mongodb+srv://user:pass@host/dbname?retryWrites=true&w=majority"
try {
  // Connect to the MongoDB cluster
  console.log(uri.replace('user',user).replace('pass',pass).replace('host',host).replace('dbname',dbName),)
  mongoose.connect(
    uri.replace('user',user).replace('pass',pass),
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.error("Mongoose is not connected", err)
      } else {
        console.log("Mongoose is connected")
      
      }
    }
  );
} catch (e) {
  console.log("Mongoose could not connect");
}