import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import EditPost from "./pages/EditPost";
import { ToastContainer, toast } from 'react-toastify';



function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </div>
        <ToastContainer />
    </AuthProvider>
  );
}

export default App;
