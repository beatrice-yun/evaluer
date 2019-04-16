// routes/axe-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Axe = require('../models/axe-model');
const Ao = require('../models/ao-model');
const Critere = require('../models/critere-model');

const router  = express.Router();

// GET route => to get a specific axe/detailed view
router.get('/ao/:aoId/axes/:axeId', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.axeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our ao have array of axes' ids and 
  // we can use .populate() method to get the whole axe objects
  //                                   ^
  //                                   |
  //                                   |
  
  Axe.findById(req.params.axeId)
    .populate("criteres")
    .then(theAxe => {
      res.status(200).json(theAxe);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to retrieve a specific axe
//router.get('/ao/:aoId/axes/:axeId', (req, res, next) => {
//  Axe.findById(req.params.axeId)
//  .then(theAxe =>{
//      res.json(theAxe);
//  })
//  .catch( err =>{
//      res.json(err);
//  })
//});

// POST route => to create a new axe
router.post('/axes', (req, res, next)=>{
  
  Axe.create({
      title: req.body.title,
      description: req.body.description,
      criteres: [],
      ao: req.body.aoID
  })
    .then(response => {
        Ao.findByIdAndUpdate(req.body.aoID, { $push:{ axes: response._id } })
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

// PUT route => to update a specific axe
router.put('/axes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Axe.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Axe with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific task
router.delete('/axes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Axe.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Axe with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;