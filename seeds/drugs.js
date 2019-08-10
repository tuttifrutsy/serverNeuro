const mongoose = require('mongoose')
const Medication = require('../models/Medication')

const drugs = [
  {
    name: "Nimotop",
    description:
      "Se utiliza disminuir el daño  y la severidad  del défifit neorológico debido a la disminución de la irrigación cerebral",
    recomendations: [
      "Vigilar regularmete la presión aterial",
      "Madres en tratamiento deben suspender la Lactancia",
      "Es EMBRIOTOXICO, debe ser usado solo si el benefico a la madre es mayor que el riesgo del feto",
      "El uso de este medicamento con otros que regulan la presión puede potenciar su efecto",
      "Es sensible a la luz por tanto debe permanecer en su empaque original"
    ]
  },
  {
    name: "Aspirina",
    description:
      "Se utiliza como antiagregante plaquetario en paciente sometidos a colocación de stent o con riesgo de trombosis",
    recomendations: [
      "Interfiere con la coagulación de la sangre",
      "Suspender el tratamiento de forma abrupta puede tener un efecto de rebote",
      "Junto con otros antiinflamatorios puede aumentar el riesgo de sangrado",
      "Previo a la realización de procedimientos dentales o cirugías informar la cantidad y dosis que toma",
      "Consulta con el médico que haya indicado la Aspirina antes de suspenderla",
      'Algunos suplementos alimienticios aumentan el riesgo de sangrado: "Arándano, Capsaicina, Ginko, Acidos grasos Omega 3"'
    ]
  },
  {
    name: "Clopidrogel",
    description:
      "Ayuda a evitar la formación de un coágulo sanguineo no deseado después de un ifarto cardiaco o cerebral",
    recomendations: [
      "Puede tomarse con o sin alimentos",
      "No se debe suspender de manera repentina, aunque no se tengan síntomas",
      "Ocasiona que sangre con más facilidad",
      "Evite actividades que puedan aumentar el riesgo de  producir una herida"
    ]
  },
  {
    name: "Keppra",
    description:
      "Se utiliza para prevenir las crisis convulsivas en pacientes bajo anticoagulación como medida de prevención en pacientes que hayan tenido un EVC",
    recomendations: [
      "En pacientes de más de 60 años, las convulsiones por EVC son más frecuentes",
      "Tiene una baja Tasa de fectos secundarios",
      "Puede tomarse con o sin alimentos "
    ]
  },
  {
    name: "Coplavix",
    description:
      "Es un medicamento formado por  Clopidroguel y Aspirina, se utiliza postrior a procedimientos de intervención percutanea",
    recomendations: [
      "Tomar con o sin alimentos",
      "No se debe suspender de manera repentina, aunque no se tengan síntomas",
      "Ocasiona que sangre con más facilidad",
      "Evite actividades que puedan aumentar el riesgo de  producir una herida"
    ]
  }
];

mongoose
  .connect("mongodb://localhost/neurogram", { useNewUrlParser: true })
  .then(db => console.log("La base de datos ha sido actualizada"))
  .catch(err => Console.log(err));

  Medication.insertMany(drugs);