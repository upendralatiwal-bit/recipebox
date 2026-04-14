const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,

  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String
    }
  ],

  instructions: [String],
  tags: [String],
  cookingTime: Number,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: Number
    }
  ],

  averageRating: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

module.exports = mongoose.model("Recipe", recipeSchema)