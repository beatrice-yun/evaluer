// routes/critere-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Axe = require('../models/axe-model');
const Critere = require('../models/critere-model');

const router  = express.Router();

// GET route => to get all the criteres
router.get('/criteres', (req, res, next) => {
  Critere.find()
    .populate('commentaires')
    .then(allTheCriteres => {
      res.json(allTheCriteres);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to retrieve a specific critere
router.get('/ao/:aoId/axes/:axeId/criteres/:critereId', (req, res, next) => {
  Critere.findById(req.params.critereId)
  .populate("commentaires")
  .then(theCritere =>{
      res.json(theCritere);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new critere
router.post('/criteres', (req, res, next)=>{
  
  Critere.create({
      title: req.body.title,
      description: req.body.description,
      note: req.body.note,
      axe: req.body.axeID,
      candidat: req.body.candidatID,
      commentaires: []
  })
    .then(response => {
        Axe.findByIdAndUpdate(req.body.axeID, { $push:{ criteres: response._id } })
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

// PUT route => to update a specific critere
router.put('/criteres/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Critere.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Critere with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific critere
router.delete('/criteres/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Critere.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Critere with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;