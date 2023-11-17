import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
  
    <footer id="footer">
        <br /> <br /> <br />
    <div className="footer-top">
    <div className="container">
        <div className="row">

        <div className="col-lg-3 col-md-6 footer-contact">
            <h3>Arsha</h3>
            <p>
            A108 Adam Street <br/>
            New York, NY 535022<br/>
            United States <br/><br/>
            <strong>Phone:</strong> +1 5589 55488 55<br/>
            <strong>Email:</strong> info@example.com<br/>
            </p>
        </div>

        <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Home</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>About us</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Services</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Terms of service</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Privacy policy</h1></li>
            </ul>
        </div>

        <div className="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Web Design</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Web Development</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Product Management</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Marketing</h1></li>
            <li><i className="bx bx-chevron-right"></i> <h1 className='WordsFooter'>Graphic Design</h1></li>
            </ul>
        </div>

        <div className="col-lg-3 col-md-6 footer-links">
            <h4>Our Social Networks</h4>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <div className="social-links mt-3">
            <h1 className='WordsFooter' ><i className="bx bxl-twitter"></i></h1>
            <h1 className='WordsFooter' ><i className="bx bxl-facebook"></i></h1>
            <h1 className='WordsFooter' ><i className="bx bxl-instagram"></i></h1>
            <h1 className='WordsFooter' ><i className="bx bxl-skype"></i></h1>
            <h1 className='WordsFooter' ><i className="bx bxl-linkedin"></i></h1>
            </div>
        </div>

        </div>
    </div>
    </div>

    <div className="container footer-bottom clearfix">
    <div className="copyright">
        &copy; Copyright <strong><span>Arsha</span></strong>. All Rights Reserved
    </div>

    </div>
</footer> 

  )
}
export default Footer