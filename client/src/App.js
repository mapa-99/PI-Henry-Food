import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeForm from "./components/RecipeForm";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path={`/home/:id`} element={<Details />} />
          <Route path="/recipe" element={<RecipeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
