// models/axe-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const axeSchema = new Schema({
  title: String,
  description: String,
  criteres: [{type: Schema.Types.ObjectId, ref: 'Critere'}],
  ao: {type: Schema.Types.ObjectId, ref: 'Ao'}
});

const Axe = mongoose.model('Axe', axeSchema);

module.exports = Axe;