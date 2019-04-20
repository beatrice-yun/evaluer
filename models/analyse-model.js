// models/analyse-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const analyseSchema = new Schema({
  note: Number,
  critere: {type: Schema.Types.ObjectId, ref: 'CritereA'},
  candidat: {type: Schema.Types.ObjectId, ref:'CandidatA'}
  // owner will be added later on
});

const Analyse = mongoose.model('Analyse', analyseSchema);

module.exports = Analyse;