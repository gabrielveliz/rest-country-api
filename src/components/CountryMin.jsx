import { Link } from 'react-router-dom';
import "../styles/countryMin.css"

const CountryMin = ({paises}) =>{

    return(
        <>  
            <div className="containerCountry">
                <div className="countryHead">
                    <div className="searchBar">barra</div>
                    <div className="regionOption">Regions Options</div>
                </div>
                <div className="countryList">
                {
                    //si no es null mostramos la informacion
                    paises && paises.slice(80,88).map((pais,index)=>
                        <Link to={`/country/${pais.name.common}`} key={index}>
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
            </div>
        </>
    )
}

export default CountryMin;