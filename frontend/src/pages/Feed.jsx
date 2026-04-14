import { useEffect, useState } from "react"
import axios from "axios"

export default function Feed() {
  const [recipes, setRecipes] = useState([])

  // 🔥 IMPORTANT: use REAL userId
  const userId = "69dd5b8fa091645e6bcccd55"

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/recipes/feed/${userId}`)
      .then(res => {
        console.log(res.data)
        setRecipes(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Feed 🍽️</h2>

      {recipes.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        recipes.map(r => (
          <div key={r._id} style={{
            background: "white",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>{r.title}</h3>
            <p>{r.description}</p>

            <p>👨‍🍳 {r.author?.name}</p>
            <p>⭐ {r.averageRating || 0}</p>
            <p>❤️ {r.likes.length}</p>
          </div>
        ))
      )}
    </div>
  )
}