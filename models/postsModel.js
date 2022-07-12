const mongoose = require("mongoose")

const PostsModel = mongoose.model(
  "ChickenRunAPI", // Nom Database
  {
    name: { // Mise en forme de l'objet Chicken
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    steps: {
        type: Number,
        required: false,
        default: 0
    },
    isRunning: {
        type: Boolean,
        default: false,
        required: false
    }
  },
  "chickenBody" // Nom Collection
)

module.exports = { PostsModel }