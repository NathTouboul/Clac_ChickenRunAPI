const express = require('express')
const router = express.Router()
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel')

router.get('/', (req, res) => { // Requête GET => Affiche les données de la Database (/chicken)
    PostsModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
            console.log(docs)
        }
        else {
            console.log("GET Error : " + err)
        }
    })
});

router.post('/', (req, res) => { // Requête POST => Envoie les données vers la Database
    const chicken = new PostsModel({
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight,
        steps: req.body.steps,
        isRunning: req.body.isRunning
    })
    chicken.save((err, docs) => {
        if (!err) {
            res.send(docs)
            console.log(docs)
        }
        else {
            console.log('POST Error : ' + err)
        }
    })
})

router.put("/:id", (req, res) => { // Requête PUT + ID => Modifie les données de l'objet voulu vers la Database
    if (!ObjectID.isValid(req.params.id)) {
        console.log('PUT Error (Unknown ID) : ' + req.params.id)
        return res.status(400).send("PUT Error (Unknown ID) : " + req.params.id)
    }
    
    const updateChicken = { // Attention: en PUT, tous les champs "required" doivent être complétés
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight,
        steps: req.body.steps,
        isRunning: req.body.isRunning
    }
  
    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateChicken }, // Mise à jour des données
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send(docs)
                console.log(docs)
            }
            else console.log("PUT Error : " + err)
        }
    )
})

router.patch("/:id", (req, res) => { // Requête PATCH + ID => Modifie les données de l'objet voulu vers la Database
    const updates = req.body

    if (!ObjectID.isValid(req.params.id)) {
        console.log('PATCH Error (Unknown ID) : ' + req.params.id)
        return res.status(400).send("PATCH Error (Unknown ID) : " + req.params.id)
    }

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updates }, // A contrario de PUT, PATCH permet de rendre la mise à jour des données facile,
        { new: true },     // car nous n'avons qu'à remplir les données à modifier, sans faire cas des "required"
        (err, docs) => {
            if (!err) {
                res.send(docs)
                console.log(docs)
            }
            else console.log("PATCH Error : " + err)
        }
    )

})

router.delete("/:id", (req, res) => { // Requête DELETE + ID => Supprime l'objet voulu de la Database
    if (!ObjectID.isValid(req.params.id)) {
        console.log('DELETE Error (Unknown ID) : ' + req.params.id)
        return res.status(400).send("DELETE Error (Unknown ID) : " + req.params.id)
    }
    
    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs)
                console.log(docs)
            }
            else console.log("DELETE Error : " + err);
        }
    )
})

module.exports = router