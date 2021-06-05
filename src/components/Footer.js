import React from "react";
import { IoLogoElectron } from "react-icons/io5";
import { BackTop } from "antd";

function Footer() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="logo">
          <IoLogoElectron
            size="small"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="logo">
          <a href="http://google.com">ORENBE Partnership</a>
        </div>
        <ul className="socials">
          <li>
            <a href="https://www.facebook.com/">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
        <div className="copyright">2021 - ORENBE Partnership</div>
        <BackTop>
          <div className="goTop">
            <i className="fas fa-arrow-circle-up"></i>
          </div>
        </BackTop>
      </div>
    </div>
  );
}

export default Footer;
