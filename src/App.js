import { useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Firebase
import { initializeApp } from 'firebase/app';
import "firebase/auth";

//Components
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import userContext from './Context/UserContext';
import Footer from "./Layout/Footer";
import NavBar from "./Layout/NavBar";

function App() {

  const [user, setUser] = useState(null);//We have to set the state initially as null or things wont work properly

  return (
    <Router>
      <ToastContainer />
      <userContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </userContext.Provider>
    </Router>
  );
}

export default App;
