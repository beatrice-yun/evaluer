// routes/commentaire-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Axe = require('../models/axe-model');
const Ao = require('../models/ao-model');
const Critere = require('../models/critere-model');
const Candidat = require('../models/candidat-model');
const Commentaire = require('../models/commentaire-model');

const router  = express.Router();

// GET route to get all the commentaires
router.get('/commentaires', (req, res, next) => {
  Commentaire.find()
    .then(allTheCommentaire => {
      res.json(allTheCommentaire);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific commentaire/detailed view
router.get('/commentaires/:commentaireId', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.commentaireId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Commentaire.findById(req.params.commentaireId)
    .then(theCommentaire => {
      res.status(200).json(theCommentaire);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new commentaire
router.post('/commentaires', (req, res, next)=>{
  
  Commentaire.create({
      title: req.body.title,
      description: req.body.description,
      page: req.body.page,
      boolean: req.body.boolean,
      critere: req.body.critereID,
      axe: req.body.axeID,
      ao: req.body.aoID,
      candidat: req.body.candidatID
  })
    .then(response => {
        Critere.findByIdAndUpdate(req.body.critereID, { $push:{ commentaires: response._id } })
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

// PUT route => to update a specific commentaire
router.put('/commentaires/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Commentaire.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Commentaire with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific commentaire
router.delete('/commentaires/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Commentaire.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Commentaire with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;