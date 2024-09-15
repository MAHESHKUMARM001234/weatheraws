import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminTemplateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      to_name: 'Weather forcast',
      from_email: formData.email, // Add this line
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      to_email: 'maheshkumarm001234@gmail.com'
    };

    emailjs.send('service_xaxnoeu', 'template_ip9y93m', adminTemplateParams, 'czhP1HswDTNyOW6vU')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully to admin!');
      })
      .catch((err) => {
        console.log('FAILED...', err);
        alert('Failed to send the message to admin, please try again.');
      });
  };

//   return (
//     <div className="contact-form-container">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit} className="contact-form">
//         <label>
//           First Name:
//           <input 
//             type="text" 
//             name="firstName" 
//             value={formData.firstName} 
//             onChange={handleChange} 
//             required 
//           />
//         </label>
//         <label>
//           Last Name:
//           <input 
//             type="text" 
//             name="lastName" 
//             value={formData.lastName} 
//             onChange={handleChange} 
//             required 
//           />
//         </label>
//         <label>
//           Phone:
//           <input 
//             type="tel" 
//             name="phone" 
//             value={formData.phone} 
//             onChange={handleChange} 
//             required 
//           />
//         </label>
//         <label>
//           Email:
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             required 
//           />
//         </label>
//         <label>
//           Message:
//           <textarea 
//             name="message" 
//             value={formData.message} 
//             onChange={handleChange} 
//             required 
//           />
//         </label>
//         <button type="submit">Contact</button>
//       </form>
//     </div>
//   );
// };
  return (
    <div>
      <div className='contactheader'>
        <p style={{color:'rgba(64,45,134,255)', fontSize: 70, padding: '50px 100px', backgroundColor: 'rgba(247,248,250,255)'}}><b>Contact Us</b></p>
      </div>
      <div className='contactformfull'>
        <div className='leftcontent'>
          <p style={{color:'rgba(64,45,134,255)',fontSize:30,paddingBottom:20}}><b>"We'd Love to Hear From You!"</b></p>
          <p style={{color:'rgba(64,45,134,255)',fontSize:25,paddingBottom:20}}><b>Customer Support</b></p>
          <p style={{fontSize:20, textAlign:'justify',paddingBottom:40}}>Our dedicated customer support team is here to assist you with any questions, concerns, or feedback you may have. We strive to provide the best shopping experience possible, and your satisfaction is our top priority.</p>
          
          <p style={{color:'rgba(64,45,134,255)',fontSize:30,paddingBottom:20}}><b>Contact Information</b></p>
          <p style={{fontSize:20,paddingBottom:10}}><b>Customer Support Representative:</b> MAHESHKUMAR M</p>
          <p style={{fontSize:20,paddingBottom:10}}><b>Email:</b> maheshkumarm001234@gmail.com</p>
          <p style={{fontSize:20}}><b>Phone:</b> 9360295163</p>


          
        </div>
        <div className="contact-form-container">
          <h2 style={{color:'rgba(64,45,134,255)',fontSize:25}}>Contact if any Query</h2><br />
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              First Name:
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Last Name:
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Phone:
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Email:
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Message:
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </label>
            <button type="submit">Contact</button>
          </form>
        </div>
      </div>
      <div className='contactmap'>
        <center>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.304395435121!2d77.50941598502861!3d9.482230957504827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06e889902bcc45%3A0x789aff6d63c7062a!2sRamco%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1720852606930!5m2!1sen!2sin" 
            style={{
              border: '1px solid black', 
              padding: '20px', 
              borderRadius: 10, 
              width: '100%', 
              height: '600px', 
              maxWidth: '1200px', 
              //maxHeight: '700px'
              
            }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            id='map' 
            title='map'>
          </iframe>
        </center>
      </div>

    </div>
  );
};

export default Contact;
