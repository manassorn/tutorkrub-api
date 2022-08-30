const mongoose = require('mongoose');
const { Schema } = mongoose;

const omiseEventSchema = new Schema({
  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  event: { type: Schema.Types.Mixed }
});

const OmiseEvent = mongoose.model('OmiseEvent', omiseEventSchema);

module.exports = OmiseEvent