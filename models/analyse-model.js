// models/analyse-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const analyseSchema = new Schema({
  auteur: String,
  ao: {type: Schema.Types.ObjectId, ref: 'Ao'},
  notes: [{type: Schema.Types.ObjectId, ref:'Note'}]
  // owner will be added later on
});

const Analyse = mongoose.model('Analyse', analyseSchema);

module.exports = Analyse;