import { useState,useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { TiWeatherSunny,TiWeatherPartlySunny,TiWeatherSnow,TiWeatherCloudy } from "react-icons/ti";
import { WiSunrise, WiSunset,WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import Header from "./Header";
import { Link } from "react-router-dom";
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
    

    useEffect(() => {
        if (data.length > 0) {
            // Extract and set data
            setCity(data.map((weather) => weather.city));
            setHumidity(data.map((weather) => weather.humidity));
            setCountry(data.map((weather) => weather.country));
            setTemp(data.map((weather) => weather.temperature));
            setWeatherDesc(data.map((weather) => weather.weather_description));
            setWindSpeed(data.map((weather) => weather.wind_speed));

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

    useEffect(()=>{
        
        console.log(matchingSearch);
        
    },[matchingSearch])
    
    const searchBar =()=>{
        const valueInput = document.querySelector('.inputValue')
        const matchSearch = data.filter((weather)=>weather.country.toLowerCase()===valueInput.value.toLowerCase())
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
                                searchBar
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
                
            </section>
        </>
    )

}
export default HomePage