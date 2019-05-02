// models/ao-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const aoSchema = new Schema({
  title: String,
  axes: [{type: Schema.Types.ObjectId, ref: 'Axe'}],
  candidats: [{type: Schema.Types.ObjectId, ref: 'Candidat'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Ao = mongoose.model('Ao', aoSchema);

module.exports = Ao;