import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import apiRequests from "../utils/api";
import Menu from "./Menu";
import Footer from "../components/Footer";
import { FaTools,FaSpinner } from "react-icons/fa";
import "../styles/Error.css"
import "../styles/CountryPage.css";

const CountryPage = ({theme,ChangeTheme}) => {
    const { countryName } = useParams();
    const [pais, setPais] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);
    const [Error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
        try {
        const response = await apiRequests.getCountry(countryName);
        const countryData = response.data[0];
        setPais(countryData);

        if (countryData.borders) {
            const borderPromises = countryData.borders.map(async (border) => {
            const borderResponse = await apiRequests.getBorder(border);
            return borderResponse.data[0].name.common;
            });

            const borderNames = await Promise.all(borderPromises);
            setBorderCountries(borderNames);
            }
        } catch (error) {
        console.error('Error:', error);
        setError(true)
        }
    };

    fetchCountry();
    }, [countryName]);

    
    if (!pais) {
        if(Error){
            return <div className='errorpagebox'><div className='errorpage'><FaTools /><p>
            Error connecting to server, please try again later.</p></div>
            <div>
                <Link to={`/home`} className='link'><div className='backbutton'><span>Back</span></div></Link>    
            </div></div>;
        }else{
            return <div className="preloaderbox">
            <div class="errorpagebox">
                <div className="icono"><FaSpinner /></div><div><p>Loading Country...</p></div>
            </div>
        </div>;
        }

    }

    const currencies = pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(', ') : 'No currencies';
    const nativeName = pais.name.nativeName ? Object.values(pais.name.nativeName)[0].official : 'No Native Name';
    const languages = pais.languages ? Object.values(pais.languages).join(', ') : 'No Languages';

    return (
        <>
    <Menu theme={theme} ChangeTheme={ChangeTheme}></Menu>
    <div className='backbuttonbox'>
        <Link to={`/home`} className='link'> 
            <div className='backbutton'>
                <FaArrowLeft /><span>Back</span>
            </div>
        </Link>
    </div>
    <div className='CountryPage'>
        <div>
            <img src={pais.flags.svg} alt={pais.flags.alt} />
        </div>
        <div>
            <div className='CountryName'><h2>{countryName}</h2></div>
        <div className='CountryDescription'>
            <div>
                <p><span className='bold'>Native Name: </span><span>{nativeName}</span> </p>
                <p><span className='bold'>Population: </span><span>{pais.population.toLocaleString()}</span> </p>
                <p><span className='bold'>Region: </span><span>{pais.region}</span> </p>
                <p><span className='bold'>Sub Region: </span><span>{pais.subregion}</span> </p>
                <p><span className='bold'>Capital: </span><span>{pais.capital && pais.capital.join(', ')}</span> </p>
            </div>
            <div>
                <p><span className='bold'>Top Level Domain: </span><span>{pais.tld}</span> </p>
                <p><span className='bold'>Currencies: </span><span>{currencies}</span> </p>
                <p><span className='bold'>Languages: </span><span>{languages}</span> </p>
            </div>
        </div>
        <div className='BordersGrid'>
            <div><p><span className='bold'>Border Countries: </span></p></div><div className='BordersGridlist'>{borderCountries.length > 0 ? 
            (
                borderCountries.map((borderCountry, index) => (
                    <Link key={index} to={`/country/${borderCountry}`}  className='link'><div className='BorderBox' ><p>{borderCountry}</p></div></Link>
                ))
                ) 
            : <p className='nobor'>No borders</p>}</div>
        </div>
        </div>
    </div>
    <Footer></Footer>
    </>
    );
}

export default CountryPage;
