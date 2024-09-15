import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import wind from '../Images/wind.png';
import icon from '../Images/icon.png';
import windicon from '../Images/windicon.png';
import weather3 from '../Images/weather3.jpg';
import temp from '../Images/temperature_new.jpg';
import windnew from '../Images/wind_new.jpg';
import precipitation from '../Images/precipitation_new.jpg';
import pressure from '../Images/pressure_new.jpg';
import cloud from '../Images/clouds_new.jpg';
import './Home.css';

const Home001 = () => {
    const navigate = useNavigate();
    const [location1, setLocation1] = useState('');
    const [view, setView] = useState('today');
    const [weatherNews, setWeatherNews] = useState([]);
    const [newdata, setnewdata] = useState(null);

    const apiKey = '9cc5f3fb9866c047c6c27c443f91f6d4';
    const openCageApiKey = '083441dd37a648f69e5188ab4f44759b';

    const selectedStyle = {
        borderBottom: '5px solid rgba(64,45,134,255)',
    };

    const unselectedStyle = {
        color: 'black',
    };

    const handlelocationdata = async (e) => {
        e.preventDefault();
        const coordinates = await getCoordinates(location1);
        if (coordinates) {
            const { lat, lng } = coordinates;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            console.log(data);
            setnewdata(data);
        }
    };

    const getCoordinates = async (location1) => {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location1)}&key=${openCageApiKey}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].geometry;
        } else {
            alert('Location not found!');
            return null;
        }
    };

    useEffect(() => {
        const fetchWeatherNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'weather',
                        apiKey: 'cbfc4eea71814f35be2119d3af0b8fd2',
                    },
                });
                setWeatherNews(response.data.articles);
            } catch (error) {
                console.error('Error fetching weather news:', error);
            }
        };

        fetchWeatherNews();
    }, []);

    return (
        <div>
            <div className="partone">
                <div className="bannersection">
                    <div className="sentence">
                        <p style={{ color: 'white', fontSize: 60 }}>
                            <b>The Weather Forecast</b>
                        </p>
                        <p
                            style={{
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'justify',
                                width: 550,
                                paddingTop: 30,
                                paddingBottom: 30,
                            }}
                        >
                            Weather forecast websites provide detailed and real-time meteorological data, including
                            temperature, precipitation, and radar maps. They offer tools like minute-by-minute updates,
                            interactive maps, and severe weather alerts to help users plan daily activities and stay
                            safe.
                        </p>
                        <form onSubmit={handlelocationdata}>
                            <div className="locationsearch">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    style={{
                                        borderRadius: 50,
                                        width: 300,
                                        height: 40,
                                        border: '3px solid rgb(156, 156, 156)',
                                        paddingLeft: 18,
                                    }}
                                    placeholder="Enter the city Name"
                                    onChange={(e) => {
                                        setLocation1(e.target.value);
                                    }}
                                />
                                <div className="buttonserach">
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '18px 18px',
                                            borderRadius: 30,
                                            backgroundColor: 'rgb(250, 238, 197)',
                                        }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {newdata && (
                        <div className="parttwo">
                            <div>
                                <div className="totalmeasure">
                                    <p style={{ color: 'white', fontSize: 55, paddingBottom: 20 }}>
                                        <b>{newdata.name}</b>
                                    </p>
                                    <div className="fullmeasure">
                                        <div className="twomeasure">
                                            <div className="measurements">
                                                <img src={wind} alt="" width="50px" height="50px" />
                                                <p style={{ paddingLeft: 10, paddingRight: 20, fontSize: 20 }}>
                                                    Wind {newdata.wind.speed} km/h
                                                </p>
                                            </div>
                                            <div className="measurements">
                                                <img src={icon} alt="" width="50px" height="50px" />
                                                <p style={{ paddingLeft: 10, fontSize: 20 }}>
                                                    {newdata.weather[0].description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="twomeasure1">
                                            <div className="measurements">
                                                <img src={temp} alt="" width="50px" height="50px" />
                                                <p style={{ paddingLeft: 10, paddingRight: 20, fontSize: 20 }}>
                                                    Temp {newdata.main.temp} °C
                                                </p>
                                            </div>
                                            <div className="measurements">
                                                <img src={pressure} alt="" width="50px" height="50px" />
                                                <p style={{ paddingLeft: 10, fontSize: 20 }}>
                                                    Pressure {newdata.main.pressure} hPa
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="daily">
                <div className="toadynavbar">
                    <p
                        className="todaynavbarclick"
                        style={view === 'today' ? selectedStyle : unselectedStyle}
                        onClick={() => setView('today')}
                    >
                        Today
                    </p>
                    <p
                        className="todaynavbarclick"
                        style={view === 'weekly' ? selectedStyle : unselectedStyle}
                        onClick={() => setView('weekly')}
                    >
                        Weekly
                    </p>
                </div>

                {view === 'today' && newdata && (
                    <div className="fulldaily">
                        <div className="dailycarts">
                            <div className="dailycart">
                                <img src={icon} alt="" width="100px" height="100px" style={{ paddingBottom: 20 }} />
                                <div className="cartdetails">
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.weather[0].description}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.main.temp} °C</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.wind.speed} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {view === 'weekly' && newdata && (
                    <div className="fulldaily">
                        <div className="dailycarts">
                            <div className="dailycart">
                                <img src={icon} alt="" width="100px" height="100px" style={{ paddingBottom: 20 }} />
                                <div className="cartdetails">
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.weather[0].description}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.main.temp} °C</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 25 }}>{newdata.wind.speed} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="weather_news">
                <h2>Weather News</h2>
                {weatherNews.map((article, index) => (
                    <div key={index} className="news_article">
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                ))}
            </div>

            <div className="weather_maps">
                <h2>Weather Maps</h2>
                <div className="map_container">
                    <img src={temp} alt="Temperature Map" />
                    <img src={windnew} alt="Wind Map" />
                    <img src={precipitation} alt="Precipitation Map" />
                    <img src={pressure} alt="Pressure Map" />
                    <img src={cloud} alt="Cloud Map" />
                </div>
            </div>
        </div>
    );
};

export default Home001;
