import { useEffect, useState } from "react"
import API from "../api"

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const userId = "69dd47246fd948ba0cce1698"

  const fetchRecipes = async () => {
    let url = "/recipes"

    if (search) {
      url = `/recipes/search?ingredient=${search}`
    }

    const res = await API.get(url)
    setRecipes(res.data)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  const like = async (id) => {
    await API.post(`/recipes/${id}/like`, { userId })
    fetchRecipes()
  }

  const comment = async (id) => {
    const text = prompt("Write comment")
    if (!text) return

    await API.post(`/recipes/${id}/comment`, { userId, text })
    fetchRecipes()
  }

  const rate = async (id) => {
    const value = prompt("Rate (1-5)")
    if (!value) return

    await API.post(`/recipes/${id}/rate`, { userId, value })
    fetchRecipes()
  }

  return (
    <div>
      <h2>All Recipes</h2>

      <div className="search-bar">
        <input
          placeholder="Search by ingredient..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchRecipes}>Search</button>
      </div>

      {recipes.map((r) => (
        <div key={r._id} className="card">
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <p>👨‍🍳 {r.author?.name}</p>

          <div className="actions">
            <button onClick={() => like(r._id)}>❤️ {r.likes.length}</button>
            <button onClick={() => comment(r._id)}>💬 Comment</button>
            <button onClick={() => rate(r._id)}>⭐ Rate</button>
          </div>

          <p>⭐ Avg: {r.averageRating}</p>
        </div>
      ))}
    </div>
  )
}