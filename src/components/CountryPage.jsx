import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryPage = () => {
    const { countryName } = useParams();
    const [pais, setPais] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
        try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = response.data[0];
        setPais(countryData);

        if (countryData.borders) {
            const borderPromises = countryData.borders.map(async (border) => {
            const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
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

    const currencies = pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(', ') : 'N/A';
    const nativeName = pais.name.nativeName ? Object.values(pais.name.nativeName)[0].official : 'N/A';
    const languages = pais.languages ? Object.values(pais.languages).join(', ') : 'N/A';

    return (
    <div>
        <div>
            <img src={pais.flags.png} alt={pais.flags.alt} />
        </div>
        <div>
            <div><p>{countryName}</p></div>
        <div>
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
        <div>
            <p>Border Countries: {borderCountries.length > 0 ? borderCountries.join(', ') : 'There are no borders'}</p>
        </div>
        </div>
    </div>
    );
}

export default CountryPage;
