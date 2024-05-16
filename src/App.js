import Home from "./views/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
