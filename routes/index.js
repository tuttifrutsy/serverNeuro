const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Care = require('../models/Care');
const Drug = require('../models/Medication');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const uploadCloud = require('../config/cloudinary');


router.get("/", (req, res, next) => {
  res.json({ msg: "Home" });
});

const sessionValidation = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.json({ msg: "Necesitas iniciar sesión para continuar" });
  }
};

router.get("/patient", sessionValidation, (req, res, next) => {
  const id = req.session.currentUser;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
});

router.post('/edit',  (req, res, next) => {
  const id = req.session.currentUser;
  const {firstname, lastname, name, age, alergy, } = req.body
  
  User.updateOne(
    { _id: id },
    {
      $set: {
        nombre: { 
          name, 
          lastname, 
          firstname },
          age,
          alergy,
      }
    }
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
})

router.post("/addfile", uploadCloud.single("photo"),(req, res, next) => {
const id = req.session.currentUser;
const imgPath = req.file.url;
const imgName = req.file.originalname;

User.updateOne({id},{$set:{imgName, imgPath}})
.then(user => {
  res.status(200).json(user);
})
.catch(err => res.status(400).json(err));
});

router.get("/cares", (req, res, next) => {
  Care.find()
    .then(allCares => {
      res.status(200).json({ cares: allCares });
    })
    .catch(err => console.log(err));
});

router.post("/addtask", (req, res, next) => {
  const { id, taskid } = req.body;

  User.updateOne({ _id: id }, { $set: { tips: taskid } })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err));
});

router.post('/newtask', (req, res,next) => {
  const id = req.session.currentUser;
  const {title, descriprion, recomendations} = req.body;
  
  const newCare = new Care({ 
    title, 
    descriprion, 
    recomendations, 
    author:id})
  newCare.save()
  .then(care => {
    res.status(200).json(care)
  })
  .catch(err => res.status(400).json(err));
})

router.get('/neurogram', (req, res, next) => {
  Post.find()
  .populate('user')
  .then(post => {
    Comment.find()
    .populate('post')
    .populate('author')
    .then(comment => {
      res.status(200).json({post, comment})
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
})

router.post('/post',( req, res, next) => {
  const id = req.session.currentUser;
  const {title, desciption} = req.body;
  const newPost = new Post({
    title,
    decription, 
    author: id
  })
  newPost.save()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => res.status(400).json(err));
})

router.post('/comment', (req, res, next) => {
  const id = req.session.currentUser;
  const postId = req
})
module.exports = router;