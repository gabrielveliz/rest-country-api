import { useState, useEffect} from "react";
import apiRequests from "../utils/api";
import CountryMin from "../components/CountryMin";
import Menu from "../components/Menu";
import "../styles/Home.css";

const Home = ({theme,ChangeTheme}) =>{
    const [paises,setPaises] = useState(null)


    useEffect(()=>{
        
        try{
        apiRequests.getCountries().then(response=>{setPaises(response.data);})
        }
        catch(error){
            console.log("Error en consulta Home:",error)
        }
        },[])
    

    return(
        <>  <Menu theme = {theme} ChangeTheme={ChangeTheme}></Menu>
            <CountryMin paises = {paises}></CountryMin>

        </>
    )
}

export default Home