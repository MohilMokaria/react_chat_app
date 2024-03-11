import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Signup />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/profile" index element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App