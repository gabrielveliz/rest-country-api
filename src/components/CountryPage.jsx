import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from "axios";
const CountryPage = () =>{
    const { countryName } = useParams();
    const [pais,setPais] = useState(null);
        
    useEffect(()=>{
        const fetchCountries = async (countryName) => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/name/'+ countryName);
                setPais(response.data[0]);
                console.log(response.data[0]);

                
            } catch (error) {
                console.error('Error:', error);
            }
            };
            
            fetchCountries(countryName);   
        }, [countryName]); // Asegurarse de que useEffect depende de countryName

        if (!pais) {
          return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene el país
        }

        let curr = Object.keys(pais.currencies)
        let name = Object.keys(pais.name.nativeName)
        let lang = pais.languages[name[0]]
        curr=pais.currencies[curr[0]].name
        name=pais.name.nativeName[name[0]].official

    return (
        <div>
            <p>{countryName}</p>
            <p>Native Name: {name}</p>
            <p>Population: {pais.population}</p>
            <p>Region: {pais.region}</p>
            <p>Sub Region: {pais.subregion}</p>
            <p>Capital: {pais.capital}</p>
            <p>Top Level Domain: {pais.tld}</p>
            <p>Currencies: {curr}</p>
            <p>Languages: {lang}</p>


        </div>
        );
}

export default CountryPage;