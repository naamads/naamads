import React from "react";
import data from "../data/footerTranslations.json";
import "../assets/styles/footer.scss";

// Social icons
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";
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
    ...logos.filter((l) => l.name === "NaaMads"),
    ...logos.filter((l) => l.name !== "NaaMads")
  ];

  return (
    <footer className="footer">
      {/* Logo Row */}
      <div className="footer-logos">
        {sortedLogos.map((logo, i) => (
          <a key={i} href={logo.link} target="_blank" rel="noopener noreferrer">
            <img src={logo.src} alt={logo.alt} className={logo.name === "NaaMads" ? "naamads" : ""} />
          </a>
        ))}
      </div>

      {/* Info Sections */}
      <div className="footer-sections">
        {Object.entries(sections).map(([title, items], i) => (
          <div className="footer-column" key={i}>
            <h4>{title}</h4>
            <ul>
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social */}
        <div className="footer-column follow-us">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noopener noreferrer">
                {icons[s.icon]}
              </a>
            ))}
          </div>
          <div className="store-buttons">
            <img src="src/assets/images/googleplay.png" alt="Google Play" />
            <img src="/icons/Appstore.jpg" alt="App Store" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <p className="footer-bottom">
        © {new Date().getFullYear()} NaaMads. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
