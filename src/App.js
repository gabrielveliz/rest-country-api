import Home from "./views/Home"
import CountryPage from "./components/CountryPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/variables.css"
import "./App.css"


function App() {
  return (
    <div className="App">
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/country/:countryName" element={<CountryPage />} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
