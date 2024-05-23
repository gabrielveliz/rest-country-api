//Archivo con solicitudes a la API
import axios from 'axios';

const base = 'https://restcountries.com/v3.1';

const api = axios.create(
    {
        baseURL:base,
        headers:{
            'Content-Type':'application/json',
        }
    },
);

const apiRequests = {

    getCountries:()=>api.get('/all'),
    getCountry:(countryName)=>api.get(`/name/${countryName}`),
    getBorder:(border)=>api.get(`/alpha/${border}`),
    

}

export default apiRequests;