// models/critere-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const critereSchema = new Schema({
  title: String,
  description: String,
  note: Number,
  axe: {type: Schema.Types.ObjectId, ref: 'Axe'},
  candidat: {type: Schema.Types.ObjectId, ref: 'Candidat'},
  commentaires: [{type: Schema.Types.ObjectId, ref: 'Commentaire'}]
});

const Critere = mongoose.model('Critere', critereSchema);

module.exports = Critere;