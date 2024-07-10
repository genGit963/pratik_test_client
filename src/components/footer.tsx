import React from "react";
import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer_container">
        <p className="company">Mero-Kaam</p>

        <div className="candidate">
          <p>An assessment submitted by</p>
          <a
            href="https://www.linkedin.com/in/mahesh-bogati-540066262/"
            target="_blank"
          >
            Mahesh Bogati
          </a>
          <p>All rights reserved.</p>
        </div>

        <div className="contact">
          <p className="title">Contact</p>
          <p>+977 9865914788</p>
          <a href="mailto: bogati.mahesh.299.792.458@gmail.com" target="_blank">
            bogati.mahesh.299.792.458@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
