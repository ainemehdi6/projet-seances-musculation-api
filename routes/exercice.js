// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur exercice
var exercice_controller = require("../controllers/exercice");

// (Étape 2) Ajout de la route qui permet d'ajouter un exercice
router.post("/", exercice_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les exercices
router.get("/", exercice_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul exercice grâce à son identifant
router.get("/:id", exercice_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul exercice grâce à son identifant
router.put("/:id", exercice_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul exercice grâce à son identifant
router.delete("/:id", exercice_controller.delete);

// Route qui permet de récupérer les exercices en fonction d'une seance
router.get("/exercice/:id", exercice_controller.getExerciceFromSeance);

// (Étape 1) Export du router
module.exports = router;