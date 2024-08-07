import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContextProvider from "./components/Context/ContextProvider";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Home from "./pages/Home/Home";
import LoginForm from "./components/LogIn/LoginForm";
import DashBoard from "./components/Dashboard/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/SignUp/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <ContextProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pizza-menu" element={<PizzaMenu />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/signup" element={<Signup/>} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<DashBoard />} />}
              />
            </Routes>
          </ContextProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;
