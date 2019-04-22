// models/commentaire-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentaireSchema = new Schema({
  title: String, 
  description: String,
  page: Number,
  boolean: {
    type: String,
    enum: ['positif', 'negatif']
  },
  note: {type: Schema.Types.ObjectId, ref: 'Note'}
  // owner will be added later on
});

const Commentaire = mongoose.model('Commentaire', commentaireSchema);

module.exports = Commentaire;