const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed
    })

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(404).json({ error: "User not found" })

    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) return res.status(400).json({ error: "Invalid password" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// FOLLOW / UNFOLLOW (TOGGLE)
router.post("/follow/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const targetUser = await User.findById(req.params.id)

    // ❗ FIX: Check if users exist
    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found" })
    }

    const isFollowing = currentUser.following.includes(req.params.id)

    if (!isFollowing) {
      currentUser.following.push(req.params.id)
      targetUser.followers.push(req.body.userId)

      await currentUser.save()
      await targetUser.save()

      res.json({ message: "Followed" })
    } else {
      res.json({ message: "Already following" })
    }

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router