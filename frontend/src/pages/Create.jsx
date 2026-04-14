import { useState } from "react"
import API from "../api"

export default function Create() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const userId = "69dd47246fd948ba0cce1698"

  const submit = async () => {
    if (!title) return alert("Title required")

    await API.post("/recipes", {
      title,
      description: desc,
      ingredients: [],
      instructions: [],
      tags: ["Easy"],
      cookingTime: 10,
      userId
    })

    alert("Recipe Created ✅")
    setTitle("")
    setDesc("")
  }

  return (
    <div>
      <h2>Create Recipe</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={submit}>Create</button>
    </div>
  )
}