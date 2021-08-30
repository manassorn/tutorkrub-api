const bcrypt = rrquire('bcrypt')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginAccountSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  email: {type: String, required: true},
  password:   String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


loginAccountSchema.pre('save', function(next) { 
  // only hash the password if it has been modified (or is new) 
  if (!this.isModified('password')) { return next(); } 
  // generate a salt 
  return bcrypt.genSalt(10, function(error, salt) { if (error) { return next(error); } 
  // hash the password using the new salt 
    return bcrypt.hash(this.password, salt, function(error, hash) { if (error) { return next(error); } 
      // override the cleartext password with the hashed one 
      this.password = hash; return next(); }); 
    
  }); 
  
}); 

loginAccountSchema.methods.comparePassword = function(passw, cb) { 
  bcrypt.compare(passw, this.password, function(err, isMatch) { 
      if (err) { 
        return cb(err, false); 
      } 
      return cb(null, isMatch); 
    
  }); 
  
};
 

const LoginAccount = mongoose.model('LoginAccount', loginAccountSchema);

module.exports = LoginAccount