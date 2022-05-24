const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginAccountSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  email: {type: String, required: true},
  password:   String,
  user: { type: Schema.Types.ObjectId, ref: 'User'/*, required: true*/ }
});


loginAccountSchema.pre('save', async function(next) { 
  // only hash the password if it has been modified (or is new) 
  console.log(this.password)
  if (!this.isModified('password')) { 
    return next();
  } 
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    return next()
  } catch (error) {
    return
  }
  
}); 

loginAccountSchema.methods.comparePassword = async function(passw) { 
  return await bcrypt.compare(passw, this.password); 
  
};
 

const LoginAccount = mongoose.model('LoginAccount', loginAccountSchema);

module.exports = LoginAccount