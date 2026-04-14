const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const recipeRoutes = require("./routes/recipeRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/api/recipes", recipeRoutes)
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
  res.send("RecipeBox API running 🚀")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅")
    app.listen(5050, () => console.log("Server running on 5050 🔥"))
  })
  .catch(err => console.log(err))
  