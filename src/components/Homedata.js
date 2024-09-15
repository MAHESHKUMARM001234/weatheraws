import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

const Homedata = () => {
    const navigate = useNavigate();
    const [location1, setLocation1] = useState('');
    const [view, setView] = useState('today');
    const selectedStyle = {
        borderBottom: '5px solid rgba(64,45,134,255)'
    };

    const unselectedStyle = {
        color: 'black'
    };
    const [weatherNews, setWeatherNews] = useState([]);
    const [count, setCount] = useState(0);

    const apiKey = '9cc5f3fb9866c047c6c27c443f91f6d4';
    const openCageApiKey = '083441dd37a648f69e5188ab4f44759b';
    const [newdata, setnewdata] = useState('Sanfranesko');
    const [weatherdata, setweatherdata] = useState({});
    const [forecast, setForecast] = useState([]);

    const handlelocationdata = async (e) => {
        e.preventDefault();
        const coordinates = await getCoordinates(location1);
        if (coordinates) {
            const { lat, lng } = coordinates;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}`
            );
            const data = await response.json();
            processForecastData(data);
            setnewdata(location1);
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

    const processForecastData = (data) => {
        const forecastData = {};
        data.list.forEach((item) => {
            const date = new Date(item.dt_txt).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            if (!forecastData[date]) {
                forecastData[date] = [];
            }
            forecastData[date].push(item);
        });
        setForecast(Object.entries(forecastData).slice(0, 5));
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

    const renderForecast = (forecast) => {
        return (
            <div className='fulldaily'>
                <div className="dailycarts">
                    {forecast.map(([date, dailyData], index) => {
                        const avgTemp = (dailyData.reduce((acc, curr) => acc + curr.main.temp, 0) / dailyData.length - 273.15).toFixed(1);
                        const windSpeed = (dailyData.reduce((acc, curr) => acc + curr.wind.speed, 0) / dailyData.length).toFixed(1);
                        const humidity = (dailyData.reduce((acc, curr) => acc + curr.main.humidity, 0) / dailyData.length).toFixed(1);

                        return (
                            <div className="dailycart" key={index}>
                                <img src={icon} alt="" width="100px" height="100px" style={{ paddingBottom: 20 }} />
                                <div className="dailyflex">
                                    <p style={{
                                        color: 'white',
                                        padding: '10px 20px',
                                        backgroundColor: 'rgb(0, 110, 255)',
                                        borderRadius: 50,
                                        display: 'inline-block',
                                        fontSize: 15
                                    }}><b>{date}</b></p>
                                </div>
                                <p style={{
                                    color: 'rgb(13, 107, 248)',
                                    fontSize: 55,
                                    paddingTop: 10,
                                    paddingBottom: 7
                                }}>{avgTemp}<sup>o</sup>C</p>
                                <div className="flexpart">
                                    <div className="flexpart">
                                        <img src={windicon} alt="" width="40px" height="30px" style={{ paddingLeft: 10 }} />
                                        <p style={{ fontSize: 16, color: 'rgb(102, 100, 100)' }}>{windSpeed} km/h</p>
                                    </div>
                                    <div className="flexpart">
                                        <img src={windicon} alt="" width="40px" height="30px" style={{ paddingLeft: 10 }} />
                                        <p style={{ fontSize: 16, color: 'rgb(102, 100, 100)' }}>{humidity}%</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: 18, paddingTop: 10, color: 'rgb(102, 100, 100)' }}>{dailyData[0].weather[0].description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="partone">
                <div className="bannersection">
                    <div className="sentence">
                        <p style={{ color: 'white', fontSize: 60 }}><b>The Weather Forecast</b></p>
                        <p style={{ color: 'white', fontSize: 20, textAlign: 'justify', width: 550, paddingTop: 30, paddingBottom: 30 }}>Weather forecast websites provide detailed and real-time meteorological data, including temperature, precipitation, and radar maps. They offer tools like minute-by-minute updates, interactive maps, and severe weather alerts to help users plan daily activities and stay safe.</p>
                        <form onSubmit={handlelocationdata}>
                            <div className='locationsearch'>
                                <input type="text" name="name" id="name" style={{ borderRadius: 50, width: 300, height: 40, border: '3px solid rgb(156, 156, 156)', paddingLeft: 18 }} placeholder="Enter the city Name" onChange={(e) => { setLocation1(e.target.value) }} />
                                <div className='buttonserach'>
                                    <button style={{ padding: '18px 18px', borderRadius: 30, backgroundColor: 'rgb(250, 238, 197)' }} >Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="parttwo">
                        <div>
                            <div className="totalmeasure">
                                <p style={{ color: 'white', fontSize: 55, paddingBottom: 20 }}><b>{newdata}</b></p>
                                <div className="fullmeasure">
                                    <div className="twomeasure">
                                        <div className="measurements">
                                            <img src={wind} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, paddingRight: 20, fontSize: 20 }}>Wind {weatherdata.wind ? weatherdata.wind.speed : 'N/A'} km/h</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={temp} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, fontSize: 20 }}>Temp {weatherdata.main ? (weatherdata.main.temp - 273.15).toFixed(1) : 'N/A'}<sup>o</sup>C</p>
                                        </div>
                                    </div>
                                    <div className="twomeasure1">
                                        <div className="measurements">
                                            <img src={pressure} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, paddingRight: 20, fontSize: 20 }}>Pressure {weatherdata.main ? weatherdata.main.pressure : 'N/A'} hPa</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={precipitation} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, fontSize: 20 }}>Humidity {weatherdata.main ? weatherdata.main.humidity : 'N/A'}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="daily">
                    <div className='toadynavbar'>
                        <p className='todaynavbarclick'
                            style={view === 'today' ? selectedStyle : unselectedStyle}
                            onClick={() => setView('today')}
                        >
                            Today
                        </p>
                        <p className='todaynavbarclick'
                            style={view === 'weekly' ? selectedStyle : unselectedStyle}
                            onClick={() => setView('weekly')}
                        >
                            Weekly
                        </p>
                    </div>

                    {view === 'today' && (
                        <div className='fulldaily'>
                            <div className="dailycarts">
                                {renderForecast(forecast)}
                            </div>
                        </div>
                    )}

                    {view === 'weekly' && (
                        <div className="weeklycarts">
                            {forecast.map(([date, dailyData], index) => (
                                <div className="weeklycart" key={index}>
                                    <img src={icon} alt="" width="100px" height="100px" style={{ paddingBottom: 30 }} />
                                    <p style={{ fontSize: 30, color: 'rgb(156, 152, 152)' }}>{date}</p>
                                    <p style={{
                                        color: 'rgb(13, 107, 248)',
                                        fontSize: 40,
                                        paddingTop: 20,
                                        paddingBottom: 7
                                    }}>{(dailyData.reduce((acc, curr) => acc + curr.main.temp, 0) / dailyData.length - 273.15).toFixed(1)}<sup>o</sup>C</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Other parts of your component */}
        </div>
    );
};

export default Homedata;
