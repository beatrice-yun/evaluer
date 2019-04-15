// models/candidat-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const candidatSchema = new Schema({
  title: String,
  ao: {type: Schema.Types.ObjectId, ref: 'Ao'}
});

const Candidat = mongoose.model('Candidat', candidatSchema);

module.exports = Candidat;