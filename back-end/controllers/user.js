//Importer le modèle user
const models = require('../models');
//Importer le package de cryptage bcrypt
const bcrypt = require('bcrypt');
//Importer le package de créateur et vérificateur de token jsonwebtoken
const jwt = require('jsonwebtoken');

//Créer et exporter la fonction signup
exports.signup = (req, res, next)=>{
    //Hasher le mdp
    bcrypt.hash(req.body.password, 10)
        //Résolution de la promesse avec retour du mdp hasher
        .then(function(hash){
            //Création du nouvel utilisateur
            const user = models.User.create({
                name : req.body.name,
                email : req.body.email, 
                password : hash,
            })
                .then (function(newUser){
                    res.status(200).json({message : user.id})
                })
                .catch(function(error){
                    res.status(400).json({error})
                })
        })
        //Si erreur lors du hashage
        .catch(function(error){
            res.status(500).json({error})
        })
}; 

exports.login = (req, res, next)=>{
    //Trouver l'utilisateur
    models.User.findOne({
        email: req.body.email
    })
        .then(function(user){
            //Si l'utilisateur n'a pas été trouvé
            if(!user){
                return res.status(401).json({message: 'Utilisateur non trouvé.'})
            }
            //Comparer le mdp avec celui dans le BDD
            bcrypt.compare(req.body.password, user.password)
                .then(function(valid){
                    //Si le mdp n'est pas valide
                    if(!valid){
                        res.status(400).json({message: 'Mot de passe incorrecte.'})
                    }
                    //Si le mdp est valide
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            {userId : user._id},
                            'RANDOM_SECRET_TOKEN',
                            {expiresIn : '24h'}
                        )
                    })
                })
                .catch(function(error){
                    res.status(500).json({error})
                })
        })
        .catch(function(error){
            res.status(500).json({error})
        })
}