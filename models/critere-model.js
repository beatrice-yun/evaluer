// models/critere-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const critereSchema = new Schema({
  title: String,
  description: String,
  axe: {type: Schema.Types.ObjectId, ref: 'Axe'},
});

const Critere = mongoose.model('Critere', critereSchema);

module.exports = Critere;