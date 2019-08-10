const express = require("express");
const authRoutes = express.Router();
const User = require('../models/User') 
const ensureLogin = require("connect-ensure-login");
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

authRoutes.get('/signup', (req, res, next) => {
  res.status(200).json({msg:' Crea aquí tu usuario'});
})

authRoutes.post("/signup", (req, res, next) => {
  const {firstname, lastname, email, password, phone, name, gender, dateB } = req.body;

  if ( password === "" || email === "") {
    return res.json({ msg: "Ingresa todos los campos" });
  }
  User.findOne({ email })
    .then(user => {
      if (user !== null) {
        return res.json({ msg: "The email already exists" });
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        nombre: {name,
          firstname,
          lastname
        },
        email,
        phone,
        dateB,
        gender,
        password: hashPass,
        role: "USER"
      });
      newUser.save(err => {
        if (err) {
          return res.json({ msg: "Something went wrong" });
        } else {
          res.json({ msg: "Se ha creado un nuevo usuario" });
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

authRoutes.get("/login", (req, res, next) => {
  res.json({ msj: "Inicia sesión para continuar" });
});

authRoutes.post("/login", (req, res) => {
  //console.log("Dentroreq.body, req.session)
  const { password, email } = req.body;
  //console.log("Datos de login", password, email)
  if (email === "" || password === "") {
    res.json({ msg: "Completa los campos" });
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ msg: "Usuario no registrado" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      //console.log("sesion", req.session, user);
      return res.json({ msg: "Se ha iniciado sesión" });
    } else {
      return res.json({ msg: "Verifica tu contraseña" });
    }
  });
});

authRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ msg: "logout succes" });
});


module.exports = authRoutes;
