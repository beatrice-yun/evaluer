// models/note-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const noteSchema = new Schema({
  title: String,
  note: {
    type: String,
    enum: ['NA', '++', '+', '=', '-', '--' ]
  },
  analyse: {type: Schema.Types.ObjectId, ref: 'Analyse'},
  critere: String,
  candidat: String,
  auteur: String,
  commentaires: [{type: Schema.Types.ObjectId, ref:'Commentaire'}]
  // owner will be added later on
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;