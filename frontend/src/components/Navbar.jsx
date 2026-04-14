import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>🍲 RecipeBox <span style={{fontSize: "14px"}}>Foodies Hub</span></h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/feed">Feed</Link>
      </div>
    </div>
  )
}