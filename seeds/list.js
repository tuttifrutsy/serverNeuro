const mongoose = require('mongoose');
const Care = require('../models/Care');

const cares = [
  {
    title: "Antes de una Cirugía",
    description: "Con estos tips te será más facil preparate para tu cirugía",
    recomendations: [
      "No fumar los días previos",
      "Preguntar al médico si puedo seguir tomando mis medicamentos",
      "Realizar los examenes previos que me hayan soliciatdo"
    ]
  },
  {
    title: "Después de la cirugía",
    description:
      "Con estos tips te será más facil tu recuperación posterior a la cirugía y sentirte comod@",
    recomendations: [
      "Avisar si tengo dolor, nauseas o cualquier otra molestia",
      "Iniciar la ingesta de liquidos en cuanto me autoricen",
      "Descansar y dejar que me ayuden cuando lo necesite",
      "Pedir ayuda siempre que lo necesite"
    ]
  },
  {
    title: "Previos a un Estudio de Resonancia",
    description: "Con estos tips te será más facil preparate para tu cirugía",
    recomendations: [
      "Preguantar al realizar la cita si requiero ayuno",
      "Si soy claustrofobico, puedo conocer el área antes de realizar es estudio o preguntar por las opciones",
      "Llegar una hora antes de mi cita para mi registro",
      "Vestir ropa comoda",
      "Ir acompañado",
      "Llevar la menor cantidad de pertenencias",
      "Llevar la receta donde me solicitan el estudio",
      "Llevar método de pago y tarjeta de seguro médico",
      "Preguntar por las opciones para recoger mis resultados",
      "Informar si soy alergico",
    ]
  },
  {
    title: "Previo a un Estudio de Tomografía",
    description: "Con estos tips te será más facil preparate para tu cirugía",
    recomendations: [
      "Informar si soy alergico",
      "Preguantar al realizar la cita si requiero ayuno",
      "Llegar una hora antes de mi cita para mi registro",
      "Vestir ropa comoda",
      "Ir acompañado",
      "Llevar la menor cantidad de pertenencias",
      "Llevar la receta donde me solicitan el estudio",
      "Llevar método de pago y tarjeta de seguro médico",
      "Preguntar por las opciones para recoger mis resultados"
    ]
  },
  {
    title: "El día de la cirugía",
    description: "Con estos tips te será más facil preparate para tu cirugía",
    recomendations: [
      "No tomar  alcohol 24 horas antes",
      "No comer, ni tome agua 12 horas antes",
      "Tomar los medicamentos indicados por la mañana con una pequeña cantidad de agua",
      "Tomar un baño completo",
      "Retirarme articulos de joyería",
      "Retirar esmalte y no usar maquillaje",
      "Llevar los estuches para anteojos, dentaduras, lentes de contacto o aparatos auditivos",
      "Llevar tarjeta del seguro médico",
      "Llevar método de pago",
      "Llevar identificación",
      "Llevar orden de internamiento",
      "Levar el listado de medicamentos que tomo",
      "Usar ropa cómoda",
      "Llevar mis objetos de aseo personales",
      "Llevar los estudios que  me hayan solicitado previamente",
      "Llegar al hospital por lo menos con una hora de anticipación para mi registro"
    ]
  },
  {
    title: "Durante el internamiento",
    description: "Con estos tips te sentiras más comodo en el hospital",
    recomendations: [
      "Pedir ayuda siempre",
      "Avisar cualquier molestia o síntoma",
      "Iniciar a deambular lo más pronto posible, si me autorizan",
      "Permitir que otros me ayuden",
      "Informar de mis preferencias de alimentos"
    ]
  }
];

mongoose
  .connect("mongodb://localhost/neurogram", { useNewUrlParser: true })
  .then(db => console.log("La base de datos ha sido actualizada"))
  .catch(err => Console.log(err));

Care.insertMany(cares);