import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Feed from "./pages/Feed"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App