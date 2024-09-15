import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
// import wlogo from '../Images/wlogo.png'
import wind from '../Images/wind.png'
import icon from'../Images/icon.png'
import windicon from '../Images/windicon.png'
import weather3 from '../Images/weather3.jpg'
import temp from '../Images/temperature_new.jpg'
import windnew from '../Images/wind_new.jpg'
import pressure1 from '../Images/pressure1.jpg'

import cloud from '../Images/clouds_new.jpg'
//import './Home.css'

const Home651 = () => {
    const navigate = useNavigate();
    const [location1, setLocation1]= useState('');
    const [view, setView] = useState('today');
    const selectedStyle = {
        borderBottom: '5px solid rgba(64,45,134,255)'
    };

    // Styles for the unselected tab
    const unselectedStyle = {
        color: 'black'
    };
    const [weatherNews, setWeatherNews] = useState([]);
    const [count, setCount] = useState(0);

    const apiKey = '9cc5f3fb9866c047c6c27c443f91f6d4';

    const openCageApiKey = '083441dd37a648f69e5188ab4f44759b';
    const [newdata, setnewdata] = useState('Sanfranesko');
    const [weatherdata,setweatherdata]=useState({});
    const handlelocationdata= async (e) => {
        e.preventDefault();
        const coordinates = await getCoordinates(location1);
        if (coordinates) {
          const { lat, lng } = coordinates;
          console.log(lat);
          console.log(lng);
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
          );
          const data= await response.json();
          //console.log(data);
          setweatherdata(data);
          setnewdata(location1);
        }
    }
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
            <style jsx>{`
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                .bannersection {
                    display: flex;
                    justify-content: space-around;
                    padding: 50px 20px;
                    background-image: url("../Images/weatherbanner001.jpg");
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 30px;
                    align-items: center;
                    flex-direction: column; /* Default to column for small screens */
                }
                .sentence {
                    text-align: center; /* Center text for better alignment */
                    padding: 20px;
                }
                .partone {
                    padding: 20px;
                }
                .measurements {
                    display: flex;
                    align-items: center;
                }
                .twomeasure,
                .twomeasure1 {
                    display: flex;
                    flex-wrap: wrap; /* Allow wrapping on small screens */
                    justify-content: space-between;
                }
                .totalmeasure {
                    text-align: center;
                    padding-right: 0;
                }
                .fullmeasure {
                    background-color: rgb(231, 231, 231);
                    border-radius: 30px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .carddetails {
                    text-align: center;
                    padding-top: 20px;
                }
                .cart {
                    padding: 20px;
                    background-image: linear-gradient(to bottom right, rgb(133, 135, 250), rgb(91, 75, 241));
                    border-radius: 30px;
                    margin-bottom: 20px;
                }
                .parttwo {
                    display: flex;
                    align-items: center;
                    flex-direction: column; /* Stack elements vertically for small screens */
                }
                .daily {
                    padding: 20px;
                }
                .dailyflex {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap; /* Allow wrapping on small screens */
                }
                .dailycart {
                    padding: 20px;
                    background-color: rgb(245, 245, 245);
                    border-radius: 30px;
                    max-width: 100%;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .dailycarts {
                    padding-right: 0;
                }
                .flexpart {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .weeklycarts {
                    padding: 20px;
                    background-color: rgb(245, 245, 245);
                    border-radius: 50%;
                    max-width: 100%;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .news {
                    padding: 20px;
                    background-color: rgb(244, 244, 244);
                    text-align: center;
                }
                .fullnews {
                    padding-top: 20px;
                }
                .newscart {
                    padding: 20px;
                    background-color: rgb(248, 248, 248);
                    border-radius: 10px;
                    max-width: 100%;
                    border: 2px solid rgb(214, 214, 214);
                    margin-bottom: 20px;
                }
                .newscartfull {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .weathermaps {
                    padding: 20px;
                    text-align: center;
                }
                .temparature {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                .mapcontent {
                    padding: 20px;
                    text-align: center;
                }
                .allmaps {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 20px;
                }
                .buttonserach {
                    padding-left: 10px;
                }
                .locationsearch {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                .paddingcarts {
                    padding: 10px;
                }
                .fullflexcart {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .toadynavbar {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }
                .todaynavbarclick {
                    font-size: 20px;
                    cursor: pointer;
                    padding: 10px;
                    margin: 5px;
                    text-align: center;
                }
                .todaynavbarclick:hover {
                    border-bottom: 3px solid rgba(64, 45, 134, 255);
                }
    
                @media (min-width: 768px) {
                    .bannersection {
                        flex-direction: row;
                        padding: 75px;
                    }
                    .partone {
                        padding: 50px;
                    }
                    .sentence {
                        text-align: left;
                    }
                    .measurements {
                        justify-content: flex-start;
                    }
                    .totalmeasure {
                        text-align: left;
                        padding-right: 50px;
                    }
                    .twomeasure,
                    .twomeasure1 {
                        justify-content: space-between;
                    }
                    .parttwo {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                    .dailyflex {
                        justify-content: space-around;
                    }
                    .news {
                        padding: 50px;
                    }
                    .newscartfull {
                        flex-direction: row;
                    }
                    .temparature {
                        flex-direction: row;
                    }
                    .mapcontent {
                        text-align: left;
                    }
                }
            `}</style>
            <div className="partone">
                <div className="bannersection">
                    <div className="sentence">
                        <p style={{ color: 'white', fontSize: 60 }}><b>The Weather Forecast</b></p>
                        <p style={{
                            color: 'white',
                            fontSize: 20,
                            textAlign: 'justify',
                            width: '100%',
                            paddingTop: 30,
                            paddingBottom: 30,
                        }}>
                            Weather forecast websites provide detailed and real-time meteorological data, including temperature, precipitation, and radar maps. They offer tools like minute-by-minute updates, interactive maps, and severe weather alerts to help users plan daily activities and stay safe.
                        </p>
                        <form onSubmit={handlelocationdata}>
                            <div className='locationsearch'>
                                <input type="text" name="name" id="name" style={{
                                    borderRadius: 50,
                                    width: '100%',
                                    maxWidth: 300,
                                    height: 40,
                                    border: '3px solid rgb(156, 156, 156)',
                                    paddingLeft: 18,
                                }} placeholder="Enter the city Name" onChange={(e) => { setLocation1(e.target.value) }} />
                                <div className='buttonserach'>
                                    <button style={{
                                        padding: '18px 18px',
                                        borderRadius: 30,
                                        backgroundColor: 'rgb(250, 238, 197)',
                                    }}>Search</button>
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
                                            <p style={{ paddingLeft: 10, paddingRight: 35, fontSize: 20 }}>Wind {weatherdata.wind ? weatherdata.wind.speed : '30'}km/h</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={wind} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, fontSize: 20 }}>Temp {weatherdata.main ? (weatherdata.main.temp - 273.15).toFixed(1) : '30'}<sup>o</sup>C</p>
                                        </div>
                                    </div>
                                    <div className="twomeasure1">
                                        <div className="measurements">
                                            <img src={wind} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, paddingRight: 20, fontSize: 20 }}>Pressure {weatherdata.main ? weatherdata.main.pressure : '10061'} hPa</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={wind} alt="" width="50px" height="50px" />
                                            <p style={{ paddingLeft: 10, fontSize: 20 }}>Humidity {weatherdata.main ? weatherdata.main.humidity : '61'}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Home651
