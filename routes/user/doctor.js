const express = require("express");
const router = express.Router();
const Drug = require('../../models/Medication');
const User = require('../../models/User');

router.get('/', (req, res, next) => {
  Drug.find()
  .then(allDrugs => {
    res.status(200).json({drugs: allDrugs})
  })
  .catch(err => console.log(err));
})



router.post('/', (req, res, next) =>  {
  const {id, drugid} = req.body;

  User.updateOne({_id:id}, {$set: {medication : drugid}})
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => res.status(400).json(err));
})


module.exports = router;