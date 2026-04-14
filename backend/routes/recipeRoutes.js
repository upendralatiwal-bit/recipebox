const express = require("express")
const Recipe = require("../models/Recipe")
const User = require("../models/User")

const router = express.Router()

// CREATE
router.post("/", async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      author: req.body.userId
    })
    res.json(recipe)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET ALL
router.get("/", async (req, res) => {
  const recipes = await Recipe.find()
    .populate("author", "name")
    .sort({ createdAt: -1 })

  res.json(recipes)
})

// SEARCH (ADVANCED)
router.get("/search", async (req, res) => {
  const { ingredient, maxTime, tag } = req.query

  let query = {}

  if (ingredient) {
    query["ingredients.name"] = { $regex: ingredient, $options: "i" }
  }

  if (maxTime) {
    query.cookingTime = { $lte: Number(maxTime) }
  }

  if (tag) {
    query.tags = { $in: [tag] }
  }

  const recipes = await Recipe.find(query)
  res.json(recipes)
})

// LIKE (TOGGLE)
router.post("/:id/like", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  const liked = recipe.likes.includes(req.body.userId)

  if (liked) {
    recipe.likes.pull(req.body.userId)
  } else {
    recipe.likes.push(req.body.userId)
  }

  await recipe.save()
  res.json(recipe)
})

// COMMENT
router.post("/:id/comment", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  recipe.comments.push({
    user: req.body.userId,
    text: req.body.text
  })

  await recipe.save()
  res.json(recipe)
})

// RATE (UPDATE IF EXISTS)
router.post("/:id/rate", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  const existing = recipe.ratings.find(
    r => r.user.toString() === req.body.userId
  )

  if (existing) {
    existing.value = req.body.value
  } else {
    recipe.ratings.push({
      user: req.body.userId,
      value: req.body.value
    })
  }

  const total = recipe.ratings.reduce((sum, r) => sum + r.value, 0)
  recipe.averageRating = total / recipe.ratings.length

  await recipe.save()
  res.json(recipe)
})

// FEED
router.get("/feed/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId)

  const recipes = await Recipe.find({
    author: { $in: user.following }
  })
    .populate("author", "name")
    .sort({ createdAt: -1 })

  res.json(recipes)
})

module.exports = router