import Home from "./views/Home"
import CountryPage from "./components/CountryPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState} from "react";
import "./styles/variables.css"
import "./App.css"


function App() {

  const [theme,seTheme] = useState(1)
  const [datatheme,setDatatheme] = useState("dark")

  const ChangeTheme = () =>{
    if(theme===1){seTheme(0);setDatatheme("light")}
    else{seTheme(1);setDatatheme("dark")}
    
  }

  return (
    <div className="App" data-theme={datatheme}>
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} ChangeTheme={ChangeTheme} />} />
        <Route path="/home" element={<Home theme={theme} ChangeTheme={ChangeTheme}/>} />
        <Route path="/country/:countryName" element={<CountryPage theme={theme} ChangeTheme={ChangeTheme}/>} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
