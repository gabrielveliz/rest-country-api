import { useState} from "react";
import { Link } from 'react-router-dom';
import "../styles/countryMin.css"

const CountryMin = ({paises}) =>{

    const [book,setBook] = useState(0)

    function next () {

        if(book + 8 <=paises.length){
        setBook(book + 8)

        }
    }
    function back () {
        if(book - 8 >=0){
        setBook(book - 8)
        }
    }

    return(
        <>  
            <div className="containerCountry">
                <div className="countryHead">
                    <div className="searchBar"><input type="text" /></div>
                    <div className="regionContainer">
                        <select id="regionOption">
                                <option value="">Filter by Region</option>
                                <option value="Africa">Africa</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>

                        </select>
                    </div>
                </div>
                <div className="countryList">
                {
                    //si no es null mostramos la informacion
                    paises && paises.slice(book,book + 8).map((pais,index)=>
                        <Link to={`/country/${pais.name.common}`} key={index} className='link'>
                        <div className="CountryCard" >
                            <img src={pais.flags.png} alt={pais.flags.alt} />
                            <span>{pais.name.common}</span>
                            <p>Population: {pais.population}</p>
                            <p>Region: {pais.region}</p>
                            <p>Capital: {pais.capital}</p>
                        </div>
                        </Link>
                        
                )}
                </div>
                <div className="buttonboxcountry">
                    <div className="back" >
                        <div><span onClick={back}>Back</span></div>
                    </div>
                    <div className="next">
                        <div><span onClick={next}>Next</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryMin;