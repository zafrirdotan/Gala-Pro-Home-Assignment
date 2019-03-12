const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
    message: req.body.message,
  });
  user
    .save()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
