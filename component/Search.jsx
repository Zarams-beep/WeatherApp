import { TiWeatherSunny,TiWeatherPartlySunny,TiWeatherSnow,TiWeatherCloudy } from "react-icons/ti";
import { useState,useEffect } from "react";
import Header from "./Header";
const Search = ()=>{
    const [getSearch,setGetSearch] = useState([])
    useEffect(() => {
        const storedValue = localStorage.getItem("matchSearch");
        if (storedValue) {
            setGetSearch(JSON.parse(storedValue));
        }
    }, []);
    
    useEffect(()=>{
        console.log(getSearch);
    },[getSearch])

    const getWeatherCondition = (temp) => {
        if (temp <= 0) return '/casey-callahan-uZiCdhLyXwM-unsplash.jpg';
        if (temp <= 10) return '/craig-whitehead-SuJp8ZpkubI-unsplash.jpg';
        if (temp <= 20) return '/kyra-kleijnen-PS8kXv3HILA-unsplash.jpg';
        if (temp <= 25) return '/trail-bFRkux6F2Pc-unsplash.jpg';
        if (temp <= 30) return '/kyle-thacker-9ric71H9ulk-unsplash.jpg';
        if (temp <= 35) return '/gaetan-werp-WG75wQX6pa0-unsplash.jpg';
        if (temp <= 40) return '/david-law-sd-34z9t13g-unsplash.jpg';
      };

      const getWeatherCondition2 = (temp) => {
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
    
    return(
        <>
            <Header/>
           <section className="mainsectionWeather">
                {getSearch.length>0?(
                    <ul>
                         {getSearch.map((item, index) => (
                            <li key={index}>
                                <div><img src={getWeatherCondition(item.temperature)} alt= {item.temperature}/></div>
                                <section className="sectionWeather">
                                    <div className="weatherNotes">
                                        <div className="notesCon">
                                        <h4>{item.country}</h4>
                                        <h6>{item.city}</h6>
                                        </div>
                                        <div className="weatherDiv">
                                            <h2>{item.temperature}&deg;</h2>
                                            <h2>{getIcons(getWeatherCondition2(item.temperature))}</h2>
                                        </div>
                                    </div>

                                    <div className="weatherNotes2">
                                        <h5>{getWeatherCondition2(item.temperature)}</h5>
                                        <p>Humidity: {item.humidity}%</p>
                                        <p>Wind: {item.wind_speed} km/h</p>
                                    </div>
                                </section>
                            </li>
                        ))}
                    </ul>
                ):(
                    <p>No items to display</p>
                )}
           </section>
        </>
    )
}
export default Search