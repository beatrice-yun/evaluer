// routes/ao-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Ao = require('../models/ao-model');
const Axe = require('../models/axe-model'); // <== !!!
const Candidat = require('../models/candidat-model'); // <== !!!

// POST route => to create a new ao
router.post('/ao', (req, res, next)=>{
 
  Ao.create({
    title: req.body.title,
    axes: [],
    candidats: [],
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get all the ao
router.get('/ao', (req, res, next) => {
  Ao.find().populate('axes')
    .then(allTheAo => {
      res.json(allTheAo);
    })
    .catch(err => {
      res.json(err);
    })
  Ao.find().populate('candidats')
    .then(allTheAo => {
      res.json(allTheAo);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific ao/detailed view
router.get('/ao/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our ao have array of axes' ids and 
  // we can use .populate() method to get the whole axe objects
  //                                   ^
  //                                   |
  //                                   |
  
  Ao.findById(req.params.id)
    .populate("axes")
    .populate("candidats")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// PUT route => to update a specific ao
router.put('/ao/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Ao.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Ao with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});

// DELETE route => to delete a specific ao
router.delete('/ao/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Ao.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `AO with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;