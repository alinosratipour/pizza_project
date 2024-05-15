import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextProvider from "./components/Context/ContextProvider";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Home from "./pages/Home/Home";
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
            </Routes>
          </ContextProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;
