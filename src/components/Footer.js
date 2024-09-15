import React from 'react'
import './Footer.css'
import wlogo from '../Images/wlogo.png'
const Footer = () => {
  return (
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />   
        <div className="subscripenews">
            
                <p style={{ color: 'white', fontSize: '40px', width: '600px', textAlign: 'justify' }}>
                    <b>Subscribe Our Newsletter For Weather Update.</b>
                </p>
            
            <div className="emailcart">
                <form action="">
                <label htmlFor="email" style={{ color: 'white', fontSize: '20px' }}>Email</label><br />
                <input type="email" id="email" name="email" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid white', background: 'transparent', outline: 'none', paddingRight: '125px' }} /><br /><br /><br /><br />
                <label htmlFor="phone" style={{ color: 'white', fontSize: '20px' }}>Phone</label><br />
                <input type="text" id="phone" name="phone" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid white', background: 'transparent', outline: 'none', paddingRight: '125px' }} /><br /><br /><br /><br /><br />
                <input type="button" value="Submit" style={{ color: 'white', padding: '10px 20px 10px 20px', backgroundColor: 'rgb(80, 77, 255)', borderRadius: '30px', border: 'none', fontSize: '20px' }} />
                </form>
            </div>
        </div>
        <div className="fullfooter">

            <div className="footer">
                <div className="linksf">
                    <img src={wlogo} alt="" width="300" height="75" style={{paddingBottom: 30}} />
                    <div className="menuoption1">
                        <ul>
                            <li><a href="/" style={{color: 'white'}}>Home</a></li>
                            <li><a href="/news" style={{color: 'white'}}>News</a></li>
                            <li><a href="/contact" style={{color: 'white'}}>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <center>    
                    <hr width="100%" size="2" color="white" noshade />
                </center>
                <div className="copyflex">
                    <p style={{color: 'white',fontSize: 20}}>&copy; 2024 Wecast. All rights received</p>
                    <div className="socialmedia">
                        <ul>
                            <li style={{paddingRight: 10}}><a href="#" className="fa fa-facebook"></a></li>  
                            <li style={{paddingRight: 10}}><a href="#" className="fa fa-instagram"></a></li>
                            <li style={{paddingRight: 10}}><a href="#" className="fa fa-linkedin"></a></li>
                            <li><a href="#" className="fa fa-twitter"></a></li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
