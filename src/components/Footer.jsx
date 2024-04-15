import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="footer-column">
          <h2>Contact</h2>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="footer-column">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
