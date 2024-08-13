import { useState,useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { TiWeatherSunny,TiWeatherPartlySunny,TiWeatherSnow,TiWeatherCloudy } from "react-icons/ti";
import { WiSunrise, WiSunset,WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import Header from "./Header";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import WorldFlags from 'react-world-flags';
const HomePage=()=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null);
    const [city,setCity] =useState([])
    const [country,setCountry] =useState({})
    const [humidity, setHumidity] = useState([])
    const [location, setLocation] = useState({})
    const [locationIt, setLocationIt] = useState({ lat: null, lon: null });
    const [temp,setTemp] = useState([])
    const [weatherDesc,setWeatherDesc] = useState([])
    const [windSpeed,setWindSpeed] = useState([])
    const [matching,setMatching] = useState('')
    const [matchingSearch,setMatchingSearch] = useState([])
    const [countryCode, setCountryCode] = useState({})
    const [uniCountry, setUniCountry] = useState([])

    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLocation({
                        lat:position.coords.latitude,
                        lon:position.coords.longitude
                    });
                },
                (err)=>{
                    setError(err.message)
                }
            )
        }
        else{
            setError('Geolocation is not supported by this browser')
        }
    },[])
    
    useEffect(()=>{
        const fetchData= async () =>{
            try{
                const response = await fetch('https://freetestapi.com/api/v1/weathers');
    
                if(!response.ok){
                    throw new Error("Network is not okay");
                }
                const jsonData=await response.json();
                setData(jsonData);
                setLoading(false);
            }
            catch (error) {
                console.error("Fetch data error: ",error);
            }
        };
        fetchData();
    },[])

    const getWeatherCondition = (temp) => {
        if (temp <= 0) return 'Extreme Cold';
        if (temp <= 10) return 'Very Cold';
        if (temp <= 20) return 'Cold';
        if (temp <= 25) return 'Cool';
        if (temp <= 30) return 'Warm';
        if (temp <= 35) return 'Hot';
        if (temp <= 40) return 'Very Hot';
        return 'Extreme Heat';
      };

      const getIcons = (condition) => {
        switch (condition) {
            case 'Extreme Cold':
                return <TiWeatherSnow className="snow icon"/>;
            case 'Very Cold':
                return <TiWeatherSnow />;
            case 'Cold':
                return <TiWeatherCloudy className="cloudy icon"/>;
            case 'Cool':
                return <TiWeatherPartlySunny className="partlysunny icon"/>;
            case 'Warm':
                return <TiWeatherPartlySunny className="partlysunny icon"/>;
            case 'Hot':
                return <TiWeatherSunny className="sunny icon"/>;
            case 'Very Hot':
                return <TiWeatherSunny className="sunny icon"/>;
            default:
                return null;
        }
    };
    
    const countries_abbreviations = [
        'US', 'GB', 'US', 'JP', 'IN', 'US', 'CA', 'AU', 'FR', 'RU', 'MX', 'BR', 'EG', 'CN', 'BR', 'TR', 'IN', 'DE', 'AE', 'KR', 'NZ', 'ES', 'ZA', 'CU', 'CA', 'JP', 'PE', 'KE', 'NO', 'CH', 'JP', 'SA', 'CO', 'ID', 'AR', 'ZA', 'SG', 'TW', 'IR', 'CA',
        'AU', 'AU', 'AU', 'AU', 'AU', 'NZ', 'NZ', 'NZ', 'GB', 'IE', 'PK']

    useEffect(() => {
        if (data.length > 0) {
            // Extract and set data
            setCity(data.map((weather) => weather.city));
            setHumidity(data.map((weather) => weather.humidity));
            setCountry(data.map((weather) => weather.country));
            setTemp(data.map((weather) => weather.temperature));
            setWeatherDesc(data.map((weather) => weather.weather_description));
            setWindSpeed(data.map((weather) => weather.wind_speed));
            // setUniCountry([...new Set(country)])
            const uniCou = [...new Set(data.map((weather) => weather.country))];
            setUniCountry(uniCou);
    

            // map temperature
            // Match location
            const match = data.find((weather) =>
                weather.latitude === location.lat && weather.longitude === location.lon
            );
            if(match){
                setMatching(
                    [match.country,
                    match.city,match.temperature,getWeatherCondition(match.temperature),match.humidity,match.wind_speed]
                );
            }else{
                setMatching([
                    data[2].country,
                    data[2].city, data[2].temperature,getWeatherCondition(data[2].temperature), data[2].humidity,data[2].wind_speed]
                )
            }
        }
    }, [data, location]);

    useEffect(() => {
        const obj = {};
        
        data.forEach((d, index) => {
          if (index < countries_abbreviations.length) {
            obj[d.country] = countries_abbreviations[index];
          }
        });
    
        setCountryCode(obj);
      }, []); 

      
    useEffect(()=>{
        console.log(uniCountry);

    },[uniCountry])
    
    const searchBar =(valueInput)=>{
        const inputString = typeof valueInput === 'string' ? valueInput : valueInput.textContent;

        const matchSearch = data.filter((weather)=>weather.country.toLowerCase()===inputString.toLowerCase())
        if (matchSearch){setMatchingSearch(matchSearch)
            console.log("Match found:", matchSearch);
            localStorage.setItem('matchSearch', JSON.stringify(matchSearch)||'none')
        }
        else{setMatchingSearch('No Match Found')
            console.log("No match found");
            localStorage.setItem('matchSearch', JSON.stringify(matchSearch)||'none')
        }
        
    };

  
    
    return(
        <>
            <main className="intro">
                <Header/>
                <div className="section1">
                    <div className="leftPart">
                        <h1>Weather forecasts for thousands of locations around the world</h1>
                        <button>
                            <input type="text" placeholder="Search for a place..." className="inputValue"/>
                            <Link to = '/search' className="link"><IoSearch className="iconSearch" onClick={
                               ()=> {searchBar(document.querySelector('.inputValue').value)}
                            }/></Link>
                        </button>
                    </div>

                    <div className="rightPart">
                        <div className="firstPart">
                            <p>{getIcons(matching[3])}</p>
                            
                            <div className="stateContainer">
                                <p className="state">{matching[0]}</p>
                                <p className="city">{matching[1]}</p>
                            </div>
                            <p className="temp">{matching[2]}&deg;</p>
                        </div>

                        <div className="secondPart">
                            <div className="sun">
                                <div className="divSun1">
                                    <WiSunrise className="sunny iconSmall"/>
                                    <div className="divSmallest">
                                        <p>Sunrise</p>
                                        <p>07:22 AM</p>
                                    </div>
                                </div>
                                <div className="divSun2">
                                    <WiHumidity className="hum iconSmall"/>
                                    <div className="divSmallest">
                                        <p>Humidity</p>
                                        <p>{matching[4]}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sun">
                            <div className="divSun2">
                                    <WiSunset className="sunny iconSmall"/>
                                    <div className="divSmallest">
                                        <p>Sunset</p>
                                        <p>09:17 PM</p>
                                    </div>
                                </div>
                                <div className="divSun2">
                                    <FaWind className="hue iconSmall"/>
                                    <div className="divSmallest">
                                        <p>Wind Speed</p>
                                        <p>{matching[5]}Km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* second part */}
            <section className="second2">
                <section className="sectionSecond1">
                    <h2>Your #1 source of any weather forecasts and updates.</h2>
                    <p>Stay updated of any weather changes with WeatherWhirl.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ex, iusto rerum vel voluptatem eaque corporis corrupti dolores molestiae velit doloribus. Dolorum ratione pariatur quas laboriosam inventore? Itaque, officiis quidem?</p>
                </section>

                <section className="sectionSecond2">
                    {/* first */}
                    <section className="smallerSecond">
                        <div className="upper">
                            <p>{getIcons(getWeatherCondition(temp[4]))}</p>
                            <div className="countryContainer">
                            <p>{country[4]}</p>
                            <p className="name">{getWeatherCondition(temp[4])}</p>
                            </div>
                            <p>{temp[4]}&deg;</p>
                        </div>

                        <div className="middleCover">
                        <div className="middle">
                            <div className="middlePart">
                                <WiSunrise/>
                                <div className="divsmallest">
                                    <p>Sunrise</p>
                                    <p>05:45 AM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiSunset/>
                                <div className="divsmallest">
                                    <p>Sunset</p>
                                    <p>08:45 PM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiHumidity/>
                                <div className="divsmallest">
                                    <p>Humidity</p>
                                    <p>{humidity[4]}%</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <FaWind/>
                                <div className="divsmallest">
                                    <p>Wind Speed</p>
                                    <p>{windSpeed[4]}%</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>

                    {/* second */}
                    <section className="smallerSecond2">
                        <div className="upper">
                            <p>{getIcons(getWeatherCondition(temp[4]))}</p>
                            <div className="countryContainer">
                            <p>{country[4]}</p>
                            <p className="name">{getWeatherCondition(temp[4])}</p>
                            </div>
                            <p>{temp[4]}&deg;</p>
                        </div>

                        <div className="middleCover">
                        <div className="middle">
                            <div className="middlePart">
                                <WiSunrise/>
                                <div className="divsmallest">
                                    <p>Sunrise</p>
                                    <p>05:45 AM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiSunset/>
                                <div className="divsmallest">
                                    <p>Sunset</p>
                                    <p>08:45 PM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiHumidity/>
                                <div className="divsmallest">
                                    <p>Humidity</p>
                                    <p>{humidity[4]}%</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <FaWind/>
                                <div className="divsmallest">
                                    <p>Wind Speed</p>
                                    <p>{windSpeed[4]}%</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </section>
            </section>

            {/* third part */}
            <section className="thirdPart">
                <h1>World weather forecast</h1>
                <p>Please select a country</p>
                <section className="section3">
                <ul>
                    {uniCountry.map((el, index) => (
                        <li key={index}>
                            <div className="flagContainer" >
                            <div className="flag2">
                                <WorldFlags 
                                    code={countryCode[el]} 
                                    alt={`${el} Flag`} 
                                    className="flagIcon"
                                />
                                <Link to='/search' className="link">
                                <p className="country" onClick={(event) => {
                                    searchBar(event.target)
                                    
                                }}>{el}</p>
                                </Link>
                            </div>
                            <MdArrowOutward className="icon"/>
                            </div>
                       
                    </li>
                    ))}
                </ul>
                </section>
            </section>

            {/* fourth part */}
            <article className="fourthPart">
                <section className="newsHeader">
                    <div className="part1">
                        <h2>Weather forecast news</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio assumenda delectus cum accusamus expedita laboriosam porro illo veniam tenetur, magni, dicta ea labore fugit. Ad laborum praesentium iste earum officiis?</p>

                    </div>

                    <Link to="/">VIEW ALL</Link>
                </section>

                <section className="newsSection">
                    <Link className="newGird link">
                        <img src="/scott-goodwill-7KrWmnpRafw-unsplash.jpg" alt="climate change" />
                        <h3>Climate Change: Earth's Greatest Enemy</h3>
                    </Link>

                    <Link className="newGird link">
                        <img src="/casey-callahan-uZiCdhLyXwM-unsplash.jpg" alt="Snow Storm" />
                        <h3>Wild Snow Storm! Stay Indoors</h3>
                    </Link>

                    <Link className="newGird link">
                        <img src="/trail-bFRkux6F2Pc-unsplash.jpg" alt="nature" />
                        <h3>Our Natural Environment is not Dead</h3>
                    </Link>
                </section>
            </article>

            {/* fifth part */}
            <section className="fifthPart">
                <div className="part1">
                    <h2>Avoid Weather Surpises</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas placeat debitis sed iure iste, similique quaerat soluta deserunt officia, error itaque modi temporibus, ipsum cupiditate necessitatibus sequi iusto alias adipisci.</p>
                </div>

                <div className="part2">
               
                    <section className="smallerSecond3">
                        <div className="upper">
                            <p>{getIcons(getWeatherCondition(temp[10]))}</p>
                            <div className="countryContainer">
                            <p className="countryName">{country[10]}</p>
                            <p className="name">{getWeatherCondition(temp[10])}</p>
                            </div>
                            <p>{temp[10]}&deg;</p>
                        </div>

                        <div className="middleCover">
                        <div className="middle">
                            <div className="middlePart">
                                <WiSunrise/>
                                <div className="divsmallest">
                                    <p>Sunrise</p>
                                    <p>05:45 AM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiSunset/>
                                <div className="divsmallest">
                                    <p>Sunset</p>
                                    <p>08:45 PM</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <WiHumidity/>
                                <div className="divsmallest">
                                    <p>Humidity</p>
                                    <p>{humidity[10]}%</p>
                                </div>
                            </div>

                            <div className="middlePart">
                                <FaWind/>
                                <div className="divsmallest">
                                    <p>Wind Speed</p>
                                    <p>{windSpeed[10]}%</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>

                
                </div>
            </section>
        </>
    )

}
export default HomePage