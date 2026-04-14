const mongoose = require("mongoose")
require("dotenv").config()

const Recipe = require("./models/Recipe")
const User = require("./models/User")

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB Connected")

    // ❌ clear old data
    await Recipe.deleteMany()
    await User.deleteMany()

    // 👤 create users
    const user1 = await User.create({
      name: "Chef Aman",
      email: "aman@test.com",
      password: "123456"
    })

    const user2 = await User.create({
      name: "Chef Ravi",
      email: "ravi@test.com",
      password: "123456"
    })

    // 👥 follow system
    user1.following.push(user2._id)
    user2.followers.push(user1._id)

    await user1.save()
    await user2.save()

    // 🍲 create recipes
    await Recipe.insertMany([
      {
        title: "Chicken Rice",
        description: "Simple dish",
        ingredients: [
          { name: "Chicken", quantity: 200, unit: "g" },
          { name: "Rice", quantity: 1, unit: "cup" }
        ],
        instructions: ["Cook rice", "Cook chicken", "Mix"],
        tags: ["Easy"],
        cookingTime: 25,
        author: user2._id
      },
      {
        title: "Veg Pasta",
        description: "Healthy pasta",
        ingredients: [
          { name: "Pasta", quantity: 1, unit: "cup" }
        ],
        instructions: ["Boil", "Serve"],
        tags: ["Veg"],
        cookingTime: 15,
        author: user1._id
      }
    ])

    console.log("🔥 Data Seeded Successfully")
    process.exit()
  })
  .catch(err => console.log(err))