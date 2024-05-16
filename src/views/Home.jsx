import { useState, useEffect} from "react";
import axios from "axios";
import CountryMin from "../components/CountryMin";
import Menu from "../components/Menu";
import "../styles/Home.css";

const Home = () =>{
    const [paises,setPaises] = useState(null)
    const [theme,seTheme] = useState("Dark Mode")

    useEffect(()=>{
        
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setPaises(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
            };
            
            fetchCountries();   
        },[])
    

    return(
        <>  <Menu theme = {theme}></Menu>
            <CountryMin paises = {paises}></CountryMin>

        </>
    )
}

export default Home