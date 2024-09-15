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
import './Home.css'

const Home = () => {
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
        <div className="partone">
            <div className="bannersection">
                <div className="sentence">
                    <p style={{color:'white', fontSize:30}}><b>The Weather Forecast</b></p>
                    <p style={{color: 'white',fontSize: 16,textAlign: 'justify',maxWidth:450,paddingTop: 30,paddingBottom: 30,overflowWrap: 'break-word'}} className='weathercontent'>Weather forecast websites provide detailed and real-time meteorological data, including temperature, precipitation, and radar maps. They offer tools like minute-by-minute updates, interactive maps, and severe weather alerts to help users plan daily activities and stay safe.</p>
                    <form  onSubmit={handlelocationdata}>
                        <div className='locationsearch'>
                            <input type="text" name="name" id="name" style={{borderRadius: 50, width: 300, height: 40, border: '3px solid rgb(156, 156, 156)', paddingLeft: 18}} placeholder="Enter the city Name"  onChange={(e)=>{setLocation1(e.target.value)}}/>
                            <div className='buttonserach'>
                                    <button  >Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='firsttodaycarts'>
                    <div className="parttwo">
                        <div className='totalpaddingpart'>
                            <div className="totalmeasure">
                                <p style={{color: 'white', fontSize: 30,paddingBottom: 20}} className='newdata'><b>{newdata}</b></p>
                                <div className="fullmeasure">
                                    <div className="twomeasure">
                                        <div className="measurements">
                                            <img src={wind} alt="" width="20px" height="20px" />
                                            <p style={{paddingLeft: 10,paddingRight: 35,fontSize: 16}}>Wind {weatherdata.wind ? weatherdata.wind.speed : '30'}km/h</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={wind} alt="" width="20px" height="20px" />
                                            <p style={{paddingLeft: 10,fontSize: 16}}>Temp {weatherdata.main ? (weatherdata.main.temp - 273.15).toFixed(1) : '30'}<sup>o</sup>C</p>
                                        </div>
                                    </div>
                                    <div className="twomeasure1">
                                        <div className="measurements">
                                            <img src={wind} alt="" width="20px" height="20px" />
                                            <p style={{paddingLeft: 10,paddingRight: 20,fontSize: 16}}>Pressure {weatherdata.main ? weatherdata.main.pressure : '10061'} hPa</p>
                                        </div>
                                        <div className="measurements">
                                            <img src={wind} alt="" width="20px" height="20px" />
                                            <p style={{paddingLeft: 10,fontSize: 16}}>Humidity {weatherdata.main ? weatherdata.main.humidity : '61'}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='firstcartnew'>
                        <div className="cart">
                            <p style={{color: 'white',padding: '5px 10px 5px 10px',backgroundColor: 'rgb(28, 28, 255)',borderRadius: 5,display: 'inline-block',fontsize: 20}}>Today</p>
                            <div className="carddetails">
                                <img src={icon} alt="" width="112px" height="75px" />
                                <p style={{color: 'white',fontSize: 55}}>26<sup>0C</sup></p>
                                <p style={{color: 'white',fontSize: 15}}>26<sup>0C</sup> - 26<sup>0C</sup></p>
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
                < div className='fullflexcart'>
                <div className='paddingcarts'>
                    <div className='fulldaily'>
                        <div className="dailycarts">
                            <div className="dailycart">
                                <img src={icon} alt="" width="100px" height="100px" style={{paddingBottom: 20}} />
                                <div className="dailyflex">
                                    <p style={{
                                        color: 'white',
                                        padding: '10px 20px',
                                        backgroundColor: 'rgb(0, 110, 255)',
                                        borderRadius: 50,
                                        display: 'inline-block',
                                        fontSize: 15
                                    }}><b>SUN</b></p>
                                    <p style={{
                                        color: 'white',
                                        padding: '10px 20px',
                                        backgroundColor: 'rgb(149, 109, 243)',
                                        borderRadius: 50,
                                        display: 'inline-block',
                                        fontSize: 15
                                    }}><b>4:00PM</b></p>
                                </div>
                                <p style={{
                                    color: 'rgb(13, 107, 248)',
                                    fontSize: 55,
                                    paddingTop: 10,
                                    paddingBottom: 7
                                }}>26<sup>0</sup></p>
                                <div className="flexpart">
                                    <div className="flexpart">
                                        <img src={windicon} alt="" width="40px" height="30px" style={{paddingLeft: 10}} />
                                        <p style={{fontSize: 16, color: 'rgb(102, 100, 100)'}}>45km/h</p>
                                    </div>
                                    <div className="flexpart">
                                        <img src={windicon} alt="" width="40px" height="30px" style={{paddingLeft: 10}} />
                                        <p style={{fontSize: 16, color: 'rgb(102, 100, 100)'}}>70%</p>
                                    </div>
                                </div>
                                <p style={{fontSize: 18, paddingTop: 10, color: 'rgb(102, 100, 100)'}}>Light Rain</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )}

            {view === 'weekly' && (
                <div className='fullflexcart'>
                    <div className='paddingcarts'>
                        <div className="weeklycarts">
                            <div className="weeklycart">
                                <img src={icon} alt="" width="100px" height="100px" style={{paddingBottom: 30}} />
                                <p style={{fontSize: 30, color: 'rgb(156, 152, 152)'}}>Mon, 7 Sep</p>
                                <p style={{
                                    color: 'rgb(13, 107, 248)',
                                    fontSize: 40,
                                    paddingTop: 20,
                                    paddingBottom: 7
                                }}>26<sup>0</sup></p>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </div>

        <div className="fullnews">
            <div className="news">
                <center>
                <p style={{ fontSize: 40,color:'rgba(64,45,134,255)' }}><b>Weather Forecast News</b></p>
                <p style={{ color: 'rgb(146, 146, 146)', paddingTop: 15 }}>Today's News</p>
                </center>

                <div className="newscartfull">
                {weatherNews.slice(0, 3).map((article, index) => (
                    <div className="newscart" key={index}>
                    <img src={article.urlToImage || weather3} alt="" width="320px" height="175px" style={{ borderRadius: 10 }} />
                    <p style={{ paddingTop: 20, width: 300, textAlign: 'justify', paddingBottom: 15 }}>{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: 15, color: 'rgb(51, 134, 243)' }}><b>Read more</b></a>
                    </div>
                ))}
                </div>

                <center>
                <a href='/news' style={{ backgroundImage: 'linear-gradient(to bottom right, rgb(133, 135, 250), rgb(91, 75, 241))', padding: '10px 20px', borderRadius: 5, color: 'white', textDecoration: 'none' }}>Read More</a>
                </center>
            </div>
        </div>
        <div className='weathermaps'><center>
            <p style={{color:'rgba(64,45,134,255)',fontSize:50, paddingTop:125}}><b>Weather Maps</b></p></center>
            <div className='mapsfull'>
                <div className='allmaps'>
                    <div >
                        <div className='temparature'>
                            <div  className='mapcontent'>
                                <p style={{color: 'rgp()',fontSize:30,paddingBottom:20}}><b>Temperature</b></p>
                                <p style={{maxWidth:300,fontSize:15,paddingBottom:20, textAlign:'justify'}}>Temperature is a measure of the average kinetic energy of particles in a substance, indicating how hot or cold it is.</p>
                            </div>
                            <img src={temp} width={250} height={150}/>
                        </div>
                        <div className='paddingtemparature'>
                            <button style={{padding:'15px 20px', border: '2px solid black', borderRadius:30,fontSize:15,backgroundColor:'white'}} onClick={() => navigate(`/temp?location1=${encodeURIComponent(location1)}`)}><b>Preview Map</b></button>
                        </div>
                    </div>
                    <div>
                        <div className='temparature'>
                            <div  className='mapcontent'>
                                <p style={{color: 'rgp()',fontSize:30,paddingBottom:20}}><b>Clouds</b></p>
                                <p style={{maxWidth:300,fontSize:15,paddingBottom:20, textAlign:'justify'}}>A cloud is a visible mass of condensed water vapor or ice crystals suspended in the atmosphere.</p>
                            </div>
                            <img src={cloud} width={250} height={150}/>
                        </div>
                        <div className='paddingtemparature'>
                            <button style={{padding:'15px 20px', border: '2px solid black', borderRadius:30,fontSize:15,backgroundColor:'white'}} onClick={() => navigate(`/cloud?location1=${encodeURIComponent(location1)}`)}><b>Preview Map</b></button>
                        </div>
                    </div>
                    <div>
                        <div className='temparature'>
                            <div  className='mapcontent'>
                                <p style={{color: 'rgp()',fontSize:30,paddingBottom:20}}><b>Wind</b></p>
                                <p style={{maxWidth:300,fontSize:15,paddingBottom:20, textAlign:'justify'}}>Wind is the movement of air from high-pressure areas to low-pressure areas in the Earth's atmosphere.</p>
                            </div>
                            <img src={windnew} width={250} height={150}/>
                        </div>
                        <div className='paddingtemparature'>
                            <button style={{padding:'15px 20px', border: '2px solid black', borderRadius:30,fontSize:15,backgroundColor:'white'}} onClick={() => navigate(`/wind?location1=${encodeURIComponent(location1)}`)}><b>Preview Map</b></button>
                        </div>
                    </div>
                    <div>
                        <div className='temparature'>
                            <div  className='mapcontent'>
                                <p style={{color: 'rgp()',fontSize:30,paddingBottom:20,}}><b>Sea Level Pressure</b></p>
                                <p style={{maxWidth:300,fontSize:15,paddingBottom:20, textAlign:'justify'}}>Sea Level Pressure (SLP) is the atmospheric pressure at sea level, which is used as a standard reference to compare pressures from different locations and altitudes.</p>
                            </div>
                            <img src={pressure1} width={250} height={150}/>
                        </div>
                        <div className='paddingtemparature'>
                            <button style={{padding:'15px 20px', border: '2px solid black', borderRadius:30,fontSize:15,backgroundColor:'white'}} onClick={() => navigate(`/pressure?location1=${encodeURIComponent(location1)}`)}><b>Preview Map</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
