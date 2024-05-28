import { useState, useEffect} from "react";
import { FaSpinner,FaTools } from "react-icons/fa";
import apiRequests from "../utils/api";
import CountryMin from "../components/CountryMin";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = ({theme,ChangeTheme}) =>{
    const [paises,setPaises] = useState(null)
    const [Error, setError] = useState(null);


    useEffect(()=>{
        
        try{
        apiRequests.getCountries().then(response=>{setPaises(response.data);})
        }
        catch(error){
            console.log("Error en consulta Home:",error)
            setError(true)
        }
        },[])
    
        if (!paises) {
            if(Error){
                return <div className='errorpagebox'><div className='errorpage'><FaTools /><p>
                Error connecting to server, please try again later.</p></div>
                </div>;
            }else{
                return <div className="preloaderbox">
                <div class="errorpagebox">
                    <div className="icono"><FaSpinner /></div><div><p>Loading Countries...</p></div>
                </div>
            </div>;
            }

            }

    return(
        <>  <Menu theme = {theme} ChangeTheme={ChangeTheme}></Menu>
            <CountryMin paises = {paises}></CountryMin>
            <Footer></Footer>
        </>
    )
}

export default Home