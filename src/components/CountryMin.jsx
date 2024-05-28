import { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/countryMin.css";
import { FaArrowLeft, FaArrowRight, FaSearch, FaAngleDown } from "react-icons/fa";

const CountryMin = ({ paises }) => {
    const [book, setBook] = useState(0);
    const [shoption, setShoption] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    function next() {
        if (book + 8 <= filteredCountries.length) {
            setBook(book + 8);
        }
    }

    function back() {
        if (book - 8 >= 0) {
            setBook(book - 8);
        }
    }

    function showhide() {
        if (shoption === 0) {
            document.getElementById("optionid").style.display = "flex";
            setShoption(1);
        } else {
            document.getElementById("optionid").style.display = "none";
            setShoption(0);
        }
    }

    function handleRegionSelect(region) {
        setSelectedRegion(region);
        setBook(0);
        showhide();
    }


    const filteredCountries = paises.filter(pais => 
        pais.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === "" || pais.region === selectedRegion)
    );

    return (
        <>
            <div className="containerCountry">
                <div className="countryHead">
                    <div className="searchBox">
                        <div className="searchBar">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search for a country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="regionContainer">
                        <div className="optiontitle cursor" onClick={showhide}>
                            <span>Filter by Region</span>
                            <FaAngleDown />
                            <div id="optionid" className="optionbox">
                                <div className="option" onClick={() => handleRegionSelect("")}><span>All</span></div>
                                <div className="option" onClick={() => handleRegionSelect("Africa")}><span>Africa</span></div>
                                <div className="option" onClick={() => handleRegionSelect("Americas")}><span>America</span></div>
                                <div className="option" onClick={() => handleRegionSelect("Asia")}><span>Asia</span></div>
                                <div className="option" onClick={() => handleRegionSelect("Europe")}><span>Europe</span></div>
                                <div className="option" onClick={() => handleRegionSelect("Oceania")}><span>Oceania</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="countryList">
                    {
                        filteredCountries.slice(book, book + 8).map((pais, index) =>
                            <Link to={`/country/${pais.name.common}`} key={index} className='link'>
                                <div className="CountryCard">
                                    <img src={pais.flags.svg} alt={pais.flags.alt} />
                                    <div className="CountryCardDescr">
                                        <span className="CountryCardDescrTitle">{pais.name.common}</span>
                                        <p><span className="bold">Population:</span> {pais.population}</p>
                                        <p><span className="bold">Region:</span> {pais.region}</p>
                                        <p><span className="bold">Capital:</span> {pais.capital}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <div className="buttonboxcountry">
                    <div className="back">
                        <div className="cursor" onClick={back}><span><FaArrowLeft /></span><span>Back</span></div>
                    </div>
                    <div className="next">
                        <div className="cursor" onClick={next}><span>Next</span><span><FaArrowRight /></span></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CountryMin;
