import React from "react";
import data from "../data/footerTranslations.json";
import "../assets/styles/footer.scss";

// Images
import naamLogo from "../assets/images/logo.png";
import googlePlay from "../assets/images/googleplay.png";
import appStore from "../assets/images/image .jpeg";

// Social icons
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const icons: any = {
  FaFacebook: <FaFacebook />,
  FaInstagram: <FaInstagram />,
  FaYoutube: <FaYoutube />,
  FaWhatsapp: <FaWhatsapp />,
  FaLinkedin: <FaLinkedin />,
  FaXTwitter: <FaXTwitter />
};

const Footer: React.FC = () => {
  const { logos, sections, socialLinks } = data;

  // NaaMads always first
  const sortedLogos = [
    ...logos.filter((l: any) => l.name === "NaaMads"),
    ...logos.filter((l: any) => l.name !== "NaaMads")
  ];

  return (
    <footer className="footer">
      {/* ===== Logo Row ===== */}
      <div className="footer-logos">
        {sortedLogos.map((logo: any, i: number) => (
          <a
            key={i}
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo.name === "NaaMads" ? naamLogo : logo.src}
              alt={logo.alt}
              className={logo.name === "NaaMads" ? "naamads" : ""}
            />
          </a>
        ))}
      </div>

      {/* ===== Sections ===== */}
      <div className="footer-sections">
        {Object.entries(sections).map(
          ([title, items]: any, i: number) => (
            <div className="footer-column" key={i}>
              <h4>{title}</h4>
              <ul>
                {items.map((item: string, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          )
        )}

        {/* ===== Social ===== */}
        <div className="footer-column follow-us">
          <h4>FOLLOW US</h4>

          <div className="social-icons">
            {socialLinks.map((s: any, i: number) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons[s.icon]}
              </a>
            ))}
          </div>

          {/* ===== Store Buttons ===== */}
          <div className="store-buttons">
            {/* <img src={googlePlay} alt="Google Play" /> */}
            <img src={appStore} alt="App Store" />
          </div>
        </div>
      </div>

      {/* ===== Bottom ===== */}
      <p className="footer-bottom">
        © {new Date().getFullYear()} NaaMads. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
