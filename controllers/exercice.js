// Import du modèle exercice
var Exercice = require("../models/exercice");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const exerciceValidationRules = () => {
    return [
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified."),

        body("description")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Description must be specified."),

        body("nbrRepParSerie")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Nombre de Repetition par Serie must be specified.")
            .isNumeric()
            .withMessage("Nombre de Repetition par Seri has non-numeric characters."),

        body("nbrSeries")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("nonbre de Series must be specified.")
            .isNumeric()
            .withMessage("nonbre de Series has non-numeric characters."),

        body("seance")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Seance must be specified."),
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), exerciceValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de exercice à ajouter 
    var exercice = new Exercice({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        nbrRepParSerie: req.body.nbrRepParSerie,
        nbrSeries: req.body.nbrSeries,
        seance: req.body.seance
    });

    // Ajout de exercice dans la bdd 
    exercice.save()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
}];

// Read
exports.getAll = (req, res, next) => {
    Exercice.find()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Exercice.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
}];

// Update
exports.update = [paramIdValidationRule(), exerciceValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de exercice à modifier 
    var exercice = new Exercice({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        nbrRepParSerie: req.body.nbrRepParSerie,
        nbrSeries: req.body.nbrSeries,
        seance: req.body.seance
    });

    Exercice.findByIdAndUpdate(req.params.id, exercice)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Exercice with id " + req.params.id + " is not found !");
            }
        })
        .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Exercice.findByIdAndRemove(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Exercice with id " + req.params.id + " is not found !");
            }
        })
        .catch((error) => res.status(500).json(error));
}];