import { useContext } from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
