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
            //
        }, [countryName]);  

        if (!pais) {
            return <div><p>Loading...</p></div>; 
        }

        let curr = Object.keys(pais.currencies)
        let name = Object.keys(pais.name.nativeName)
        let lang = Object.keys(pais.languages)
        let border = Object.keys(pais.borders)
        let languagues = "";
        let borders = [];
        let cont = 0
        curr=pais.currencies[curr[0]].name
        name=pais.name.nativeName[name[0]].official

        lang.forEach(element => { // generando un string con los idiomas
            cont = cont + 1
            if(cont<lang.length){
                languagues = languagues + pais.languages[element]+ ", "; // coma cuando no ha terminado
            }
            else{
                languagues = languagues + pais.languages[element]+ "."; // punto al final
            }
            
        });


            border.forEach(element => {
                borders.push(pais.borders[element]) // generando un arreglo para buscar los nombres de las fronteras
            })
            console.log(borders)
        

    return (
        <div>
            <div>
                <img src={pais.flags.png} alt={pais.flags.alt} />
            </div>
            <div>
                <div><p>{countryName}</p></div>
                <div>
                    <div>
                        <p>Native Name: {name}</p>
                        <p>Population: {pais.population}</p>
                        <p>Region: {pais.region}</p>
                        <p>Sub Region: {pais.subregion}</p>
                        <p>Capital: {pais.capital}</p>
                    </div>
                    <div>
                        <p>Top Level Domain: {pais.tld}</p>
                        <p>Currencies: {curr}</p>
                        <p>Languages: {languagues}</p>
                    </div>
                </div>
                <div>
                    <p>Border Countries: 
                        </p>
                </div>
                
                

            </div>
            
            


        </div>
        );
}

export default CountryPage;