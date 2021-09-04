const mongoose = require("mongoose")
const { Schema } = mongoose;

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
      if (err) {
        console.error("Mongoose is not connected", err)
      } else {
        console.log("Mongoose is connected")
      
        // Duplicate the ID field. 
        Schema.virtual('id').get(function(){ return this._id.toHexString(); }); // Ensure virtual fields are serialised. 
        Schema.set('toJSON', { virtuals: true });
      }
    }
  );
} catch (e) {
  console.log("Mongoose could not connect");
}