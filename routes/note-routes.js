// routes/note-routes.js

const express = require('express');
const mongoose = require('mongoose');

const Analyse = require ('../models/analyse-model');
const Note = require ('../models/note-model');
const Commentaire = require ('../models/commentaire-model');

const router  = express.Router();


// GET route to get all the notes
router.get('/notes', (req, res, next) => {
  Note.find()
    .populate('commentaires')
    .then(allTheNotes => {
      res.json(allTheNotes);
    })                                         
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific note/detailed view
router.get('/notes/:noteId', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.noteId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Note.findById(req.params.noteId)
  .populate("commentaires")
  .then(theNote =>{
      res.json(theNote);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new note
router.post('/notes', (req, res, next)=>{
  
  Note.create({
      title: req.body.title,
      note: req.body.note,
      analyse: req.body.analyseID,
      critere: req.body.critere,
      candidat: req.body.candidat,
      commentaires: []
  })
      .then(response => {
        Analyse.findByIdAndUpdate(req.body.analyseID, { $push:{ notes: response._id } })
        .then(theResponse => {
          res.json(theResponse);
      })
      .catch(err => {
        res.json(err);
    })
  })
  .catch(err => {
    res.json(err);
  })
});

// PUT route => to update a specific note
router.put('/notes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Note.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Note with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific analyse
router.delete('/notes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Note with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;