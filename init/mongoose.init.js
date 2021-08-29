const mongoose = require("mongoose")

const user = process.env.MONGODB_ATLAS_USER
const pass = process.env.MONGODB_ATLAS_PASS
const uri =
  "mongodb+srv://user:pass@cluster0.wsexn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
  console.log(uri.replace('user',user).replace('pass',pass),)
  mongoose.connect(
    uri.replace('user',user).replace('pass',pass),
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log(err)
      console.log("Mongoose is connected")
      const LoginAccountDao = require('../dao/LoginAccountDao')
      LoginAccountDao.getUserByEmailPassword('m@m.com','pass')
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  );
} catch (e) {
  console.log("Mongoose could not connect");
}