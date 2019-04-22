// routes/candidat-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Candidat = require('../models/candidat-model');
const Ao = require('../models/ao-model');

const router  = express.Router();

// GET route => to retrieve a specific candidat
router.get('/ao/:aoId/candidats/:candidatId', (req, res, next) => {
  Candidat.findById(req.params.candidatId)
  .then(theCandidat =>{
      res.json(theCandidat);
  })
  .catch( err =>{
      res.json(err);
  })
});

// GET route => to get all the candidats
router.get('/candidats', (req, res, next) => {
  Candidat.find()
    .then(allTheCandidats => {
      res.json(allTheCandidats);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new candidat
router.post('/candidats', (req, res, next)=>{
  
  Candidat.create({
      title: req.body.title,
      ao: req.body.aoID
  })
    .then(response => {
        Ao.findByIdAndUpdate(req.body.aoID, { $push:{ candidats: response._id } })
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
})

// PUT route => to update a specific candidat
router.put('/candidats/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Candidat.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Candidat with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific task
router.delete('/candidats/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Candidat.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Candidat with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;