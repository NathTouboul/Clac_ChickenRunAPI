const express = require('express')
const router = express.Router()
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel')

router.get("/:id", (req, res) => { // Requête GET + ID de l'objet => incrémentation des steps (/chicken/run)
    if (!ObjectID.isValid(req.params.id)) { // ID introuvable
        console.log('Chicken Run Error (Unknown ID) : ' + req.params.id)
        return res.status(400).send("Chicken Run Error (Unknown ID) : " + req.params.id)
    }

    PostsModel.findByIdAndUpdate( // Si ID trouvé, mise à jour des steps => steps = steps + 1
        req.params.id,
        { $inc: { "steps" : 1 } },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send("One step has been added for Object " + req.params.id)
                console.log("One step has been added for Object " + req.params.id)
            }
            else console.log("Chicken Run Error : " + err)
        }
    )
})

module.exports = router