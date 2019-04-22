// routes/analyse-routes.js

const express = require('express');
const mongoose = require('mongoose');

const router  = express.Router();
const Analyse = require ('../models/analyse-model');
const Note = require ('../models/note-model');

// GET route to get all the analyses
router.get('/analyses', (req, res, next) => {
  Analyse.find()
    .populate('notes')
    .then(allTheAnalyses => {
      res.json(allTheAnalyses);
    })                                         
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific analyse/detailed view
router.get('/analyses/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Analyse.findById(req.params.id)
    .populate('notes')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new analyse
router.post('/analyses', (req, res, next)=>{
  
  Analyse.create({
      auteur: req.body.auteur,
      ao: req.body.aoID,
      notes: []
  })

      .then(response => {
        res.json(response);
      })
  
        .catch(err => {
          res.json(err);
      })
});

// PUT route => to update a specific analyse
router.put('/analyses/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Analyse.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Analyse with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific analyse
router.delete('/analyses/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Analyse.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Analyse with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;