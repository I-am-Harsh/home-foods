const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var recipeSchema = new Schema({
   url : String,
   description : String,
   method : [{}],
   ingredients : [{}],
   date : Date,
   imageUrl : String,
   displayName : String
//    tags : [String]
})


var Recipes = mongoose.model('Recipe',recipeSchema);

module.exports = Recipes;

