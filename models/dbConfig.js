const mongoose = require('mongoose') // Initialisation de MongoDB (Database)

mongoose.connect("mongodb+srv://root:azertyuiop@cluster1.gyrg5ta.mongodb.net/?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true}, // Connexion à MongoDB avec les credentials
 (err) => {
    if (!err) console.log("Mongodb connected")
    else console.log("Connection Error :" + err)
})