import React, { useState } from 'react';
import wind from '../Images/wind.png'
import icon from'../Images/icon.png'
import windicon from '../Images/windicon.png'
import weather3 from '../Images/weather3.jpg'
const WeatherComponent = () => {
    const [view, setView] = useState('today'); // Initial view is 'today'

    return (
        <div className="daily">
            <div className='toadynavbar'>
                <p 
                    style={{fontSize: 30, cursor: 'pointer'}} 
                    onClick={() => setView('today')}
                >
                    Today
                </p>
                <p 
                    style={{fontSize: 30, cursor: 'pointer'}} 
                    onClick={() => setView('weekly')}
                >
                    Weekly
                </p>
            </div>

            {view === 'today' && (
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
            )}

            {view === 'weekly' && (
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
            )}
        </div>
    );
};

export default WeatherComponent;
