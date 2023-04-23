// Import du modèle seance
var Seance = require("../models/seance");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const seanceValidationRules = () => {
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

        body("date", "Invalid date")
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate()


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
exports.create = [bodyIdValidationRule(), seanceValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de seance à ajouter 
    var seance = new Seance({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
    });

    // Ajout de seance dans la bdd 
    seance.save()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
}];

// Read
exports.getAll = (req, res, next) => {
    Seance.find()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Seance.findById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
}];

// Update
exports.update = [paramIdValidationRule(), seanceValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de seance à modifier 
    var seance = new Seance({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
    });

    Seance.findByIdAndUpdate(req.params.id, seance).then((result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json("Seance with id " + req.params.id + " is not found !");
        }
    })
        .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Seance.findByIdAndRemove(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Seance with id " + req.params.id + " is not found !");
            }
        })
        .catch((error) => res.status(500).json(error));
}];