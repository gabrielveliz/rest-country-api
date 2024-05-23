import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiRequests from "../utils/api";
import Menu from "./Menu"
import "../styles/CountryPage.css";

const CountryPage = ({theme,ChangeTheme}) => {
    const { countryName } = useParams();
    const [pais, setPais] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
        try {
        //apiRequests.getCountry(countryName).then(response=>{const countryData = response.data[0];setPais(response.data[0]);})
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
        }
    };

    fetchCountry();
    }, [countryName]);

    if (!pais) {
    return <div><p>Loading Country...</p></div>;
    }

    const currencies = pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(', ') : 'No currencies';
    const nativeName = pais.name.nativeName ? Object.values(pais.name.nativeName)[0].official : 'No Native Name';
    const languages = pais.languages ? Object.values(pais.languages).join(', ') : 'No Languages';

    return (
        <>
    <Menu theme={theme} ChangeTheme={ChangeTheme}></Menu>
    <div className='CountryPage'>
        <div>
            <img src={pais.flags.png} alt={pais.flags.alt} />
        </div>
        <div>
            <div className='CountryName'><p>{countryName}</p></div>
        <div className='CountryDescription'>
            <div>
                <p>Native Name: {nativeName}</p>
                <p>Population: {pais.population}</p>
                <p>Region: {pais.region}</p>
                <p>Sub Region: {pais.subregion}</p>
                <p>Capital: {pais.capital && pais.capital.join(', ')}</p>
            </div>
            <div>
                <p>Top Level Domain: {pais.tld}</p>
                <p>Currencies: {currencies}</p>
                <p>Languages: {languages}</p>
            </div>
        </div>
        <div className='BordersGrid'>
            <p>Border Countries: </p>{borderCountries.length > 0 ? 
            (
                borderCountries.map((borderCountry, index) => (
                    <Link key={index} to={`/country/${borderCountry}`}><div className='BorderBox' ><p>{borderCountry}</p></div></Link>
                ))
                ) 
            : <p>No borders</p>}
        </div>
        </div>
    </div>
    </>
    );
}

export default CountryPage;
