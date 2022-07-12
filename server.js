const express = require('express') // Utilisation du framework express
var app = express()
var port = process.env.port || 5000 // Initialisation Port

require("./models/dbConfig")
const postsRoutes = require('./routes/postsController')
const add1Route = require('./routes/addingController') // Initialisation fichiers routes
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json()) // Utilisation de body parser pour la mise en forme en JSON
app.use(cors())
app.use('/chicken', postsRoutes) // Middleware url chicken
app.use('/chicken/run', add1Route) // Middleware url chicken/run

app.listen(port, function() { // Serveur lancé sur le port 5000
    var datetime = new Date()
    var message = "Server running on port: " + port + ", at " + datetime
    console.log(message)
})